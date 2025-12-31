import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const categoryEnumToSlug: Record<string, string> = {
  MEDICAL_DEVICE: "medical-devices",
  SUPPLEMENT: "supplements",
  PRESCRIPTION: "prescription",
  MEDICAL_SUPPLY: "medical-supplies",
}

// kalau kamu simpan gambar di public/store, ini cara “default”
// nanti bisa kamu ubah sesuai file naming kamu
function getProductImage(itemName: string) {
  const safe = itemName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  return `/store/${safe}.png`
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { is_active: true },
      orderBy: { createdAt: "desc" },
    })

    // DTO untuk FE StorePage
    const data = products.map((p) => ({
      id: p.id,
      name: p.item_name,
      category: categoryEnumToSlug[p.category] ?? "all",
      price: p.unit_price,
      description: p.description,
      quantity: p.quantity,
      // derived fields
      inStock: p.quantity > 0,
      prescription: p.category === "PRESCRIPTION", // atau false kalau mau
      image: getProductImage(p.item_name),
    }))

    return NextResponse.json(data)
  } catch (e) {
    console.error("[GET /api/inventory]", e)
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}
