import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

/* =========================
   AUTH GUARD
========================= */
async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    return null
  }

  return session
}

/* =========================
   VALIDATION SCHEMA
========================= */
const productSchema = z.object({
  item_name: z.string().min(1),
  description: z.string().optional(),
  category: z.enum([
    "MEDICAL_DEVICE",
    "SUPPLEMENT",
    "PRESCRIPTION",
    "MEDICAL_SUPPLY",
  ]),
  quantity: z.number().int().min(0),
  reorder_level: z.number().int().min(0),
  unit_price: z.number().int().min(0),
  supplier: z.string().optional(),
  is_active: z.boolean().optional(),
})

/* =========================
   GET — list inventory
========================= */
export async function GET() {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const products = await prisma.product.findMany({
    where: { is_active: true },
    orderBy: { createdAt: "desc" },
  })

  // mapping Prisma → Frontend
  const result = products.map((p) => ({
    id: p.id,
    item_name: p.item_name,
    description: p.description,
    category: p.category,
    quantity: p.quantity,
    reorder_level: p.reorder_Level,
    unit_price: p.unit_price,
    supplier: p.supplier,
    is_active: p.is_active,
  }))

  return NextResponse.json(result)
}

/* =========================
   POST — add inventory
========================= */
export async function POST(req: Request) {
    try {
      const session = await requireAdmin()
      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }
  
      const body = await req.json()
      const parsed = productSchema.safeParse(body)
  
      if (!parsed.success) {
        return NextResponse.json(
          { message: "Invalid data", errors: parsed.error.format() },
          { status: 400 }
        )
      }
  
      const data = parsed.data
  
      const product = await prisma.product.create({
        data: {
          item_name: data.item_name,
          description: data.description ?? "",
          category: data.category,
          quantity: data.quantity,
          reorder_Level: data.reorder_level,
          unit_price: data.unit_price,
          supplier: data.supplier ?? null,
          is_active: data.is_active ?? true,
        },
      })
  
      return NextResponse.json({
        id: product.id,
        item_name: product.item_name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        reorder_level: product.reorder_Level,
        unit_price: product.unit_price,
        supplier: product.supplier,
        is_active: product.is_active,
      })
    } catch (err) {
      console.error("[admin inventory POST] error:", err)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
  }
  

/* =========================
   PUT — edit inventory
========================= */
export async function PUT(req: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  if (!body.id) {
    return NextResponse.json({ message: "Missing product id" }, { status: 400 })
  }

  const parsed = productSchema.partial().safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid data", errors: parsed.error.format() },
      { status: 400 }
    )
  }

  const data = parsed.data

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      item_name: data.item_name,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      reorder_Level: data.reorder_level,
      unit_price: data.unit_price,
      supplier: data.supplier,
      is_active: data.is_active,
    },
  })

  return NextResponse.json({
    id: product.id,
    item_name: product.item_name,
    description: product.description,
    category: product.category,
    quantity: product.quantity,
    reorder_level: product.reorder_Level,
    unit_price: product.unit_price,
    supplier: product.supplier,
    is_active: product.is_active,
  })
}

/* =========================
   DELETE — soft delete
========================= */
export async function DELETE(req: Request) {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
  
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ message: "Missing product id" }, { status: 400 })
    }
  
    await prisma.product.update({ 
      where: { id },
      data: { is_active: false }
    })
  
    return NextResponse.json({ success: true })
  }
  
