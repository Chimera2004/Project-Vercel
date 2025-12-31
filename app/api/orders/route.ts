import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const createOrderSchema = z.object({
  // FE kamu sekarang kirim items full (id,name,price,quantity,image)
  // Kita butuh minimal: id + quantity
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),

  // FE kamu kirim total + userId, tapi backend tidak percaya ini
  total: z.any().optional(),
  userId: z.any().optional(),

  // nanti kalau kamu sudah wiring form shipping, FE bisa kirim ini
  shipping: z
    .object({
      full_name: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email(),
      address: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
    })
    .optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    const parsed = createOrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { items, shipping } = parsed.data

    
    const userId = session?.user?.id ?? null

 
    const productIds = items.map((i) => i.id)

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        is_active: true,
      },
      select: {
        id: true,
        item_name: true,
        unit_price: true,
        quantity: true,
      },
    })

    // validasi semua product ditemukan
    const productMap = new Map(products.map((p) => [p.id, p]))
    const missing = productIds.filter((id) => !productMap.has(id))
    if (missing.length > 0) {
      return NextResponse.json(
        { message: "Some products not found or inactive", missing },
        { status: 404 }
      )
    }

    // validasi stok cukup
    const outOfStock: Array<{ productId: string; available: number; requested: number }> = []
    for (const it of items) {
      const p = productMap.get(it.id)!
      if (p.quantity < it.quantity) {
        outOfStock.push({ productId: it.id, available: p.quantity, requested: it.quantity })
      }
    }
    if (outOfStock.length > 0) {
      return NextResponse.json(
        { message: "Out of stock", outOfStock },
        { status: 409 }
      )
    }

    const subtotal = items.reduce((sum, it) => {
      const p = productMap.get(it.id)!
      return sum + p.unit_price * it.quantity
    }, 0)


    const shippingCost = 999
    const tax = Math.round(subtotal * 0.08)
    const total = subtotal + shippingCost + tax

    let shippingData:
      | {
          full_name: string
          phone: string
          email: string
          address: string
          city: string
          state: string
          zipCode: string
        }
      | null = null

    if (shipping) {
      shippingData = shipping
    } else if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          name: true,
          email: true,
          phoneNumber: true,
          profile: {
            select: {
              address: true,
              city: true,
              state: true,
              zipCode: true,
            },
          },
        },
      })

      if (user?.profile?.address && user.profile.city && user.profile.state && user.profile.zipCode) {
        shippingData = {
          full_name: user.name,
          phone: user.phoneNumber ?? "-",
          email: user.email,
          address: user.profile.address,
          city: user.profile.city,
          state: user.profile.state,
          zipCode: user.profile.zipCode,
        }
      }
    }

    if (!shippingData) {
      return NextResponse.json(
        {
          message:
            "Shipping address is required. Please fill shipping form (or complete UserProfile address).",
        },
        { status: 400 }
      )
    }

    // 5) Atomic transaction: create order + items + shipping + decrement stock
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: userId,
          status: "PENDING",
          subtotal,
          shipping: shippingCost,
          tax,
          total,
        },
        select: { id: true },
      })

      // create order items (snapshot)
      await tx.orderItem.createMany({
        data: items.map((it) => {
          const p = productMap.get(it.id)!
          return {
            orderId: order.id,
            productId: p.id,
            item_name: p.item_name,
            unit_price: p.unit_price,
            quantity: it.quantity,
          }
        }),
      })

      // create shipping snapshot
      await tx.shippingAddress.create({
        data: {
          orderId: order.id,
          full_name: shippingData!.full_name,
          phone: shippingData!.phone,
          email: shippingData!.email,
          address: shippingData!.address,
          city: shippingData!.city,
          state: shippingData!.state,
          zipCode: shippingData!.zipCode,
        },
      })

      for (const it of items) {
        await tx.product.update({
          where: { id: it.id },
          data: { quantity: { decrement: it.quantity } },
        })
      }

      return order
    })

    return NextResponse.json(
      {
        message: "Order created",
        orderId: result.id,
        totals: {
          subtotal,
          shipping: shippingCost,
          tax,
          total,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[api/orders] POST error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
