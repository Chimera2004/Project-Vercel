import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true }, // hanya dokter aktif
      orderBy: { name: "asc" },
      select: { id: true, name: true }, // hanya info yang perlu user
    })

    return NextResponse.json(doctors)
  } catch (error) {
    console.error("Get doctors error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
