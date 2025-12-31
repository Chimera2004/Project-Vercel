import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import path from "path"
import fs from "fs/promises"

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "ADMIN") return null
  return session
}

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

export async function POST(req: Request) {
  const session = await requireAdmin()
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const itemName = (formData.get("item_name") as string | null) ?? ""

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
    }
    if (!itemName) {
      return NextResponse.json({ message: "Missing item_name" }, { status: 400 })
    }

    // (opsional) validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // pastikan folder public/store ada
    const storeDir = path.join(process.cwd(), "public", "store")
    await fs.mkdir(storeDir, { recursive: true })

    // tentukan ekstensi (simple)
    const filename = `${safeFileName(itemName)}.png`
    const filepath = path.join(storeDir, filename)

    // overwrite file kalau sudah ada
    await fs.writeFile(filepath, buffer)

    // ini URL yang bisa langsung dipakai <img src="...">
    return NextResponse.json({ imagePath: `/store/${filename}` })
  } catch (err) {
    console.error("[upload-image] error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
