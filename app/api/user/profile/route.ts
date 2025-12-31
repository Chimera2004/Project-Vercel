import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


function parseDateOnly(dateStr?: string | null): Date | null {
  if (!dateStr) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr)
  if (!m) return null
  const y = Number(m[1])
  const mo = Number(m[2])
  const d = Number(m[3])
  return new Date(Date.UTC(y, mo - 1, d))
}

function toDateOnlyString(date?: Date | null): string {
  if (!date) return ""
  const yyyy = date.getUTCFullYear()
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(date.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}


export async function GET(req: Request) {
  
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    console.log("SESSION USER:", session?.user)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
        profile: {
          select: {
            address: true,
            city: true,
            state: true,
            zipCode: true,
            emergencyContact: true,
            emergencyPhone: true,
            medicalHistory: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      userId: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
      dateOfBirth: toDateOnlyString(user.dateOfBirth),

      address: user.profile?.address ?? "",
      city: user.profile?.city ?? "",
      state: user.profile?.state ?? "",
      zipCode: user.profile?.zipCode ?? "",
      emergencyContact: user.profile?.emergencyContact ?? "",
      emergencyPhone: user.profile?.emergencyPhone ?? "",
      medicalHistory: user.profile?.medicalHistory ?? "",
    })
  } catch (e) {
    console.error("[GET /api/user/profile]", e)
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }

}



export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
      if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }
      const userId = session.user.id

      const body = await req.json()


    const name = String(body?.name ?? "").trim()
    const email = body?.email != null ? String(body.email).trim() : undefined
    const phoneNumber = body?.phoneNumber != null ? String(body.phoneNumber).trim() : undefined
    const dateOfBirth = body?.dateOfBirth != null ? parseDateOnly(String(body.dateOfBirth).trim()) : undefined

    const profileData = {
      address: body?.address != null ? String(body.address).trim() : undefined,
      city: body?.city != null ? String(body.city).trim() : undefined,
      state: body?.state != null ? String(body.state).trim() : undefined,
      zipCode: body?.zipCode != null ? String(body.zipCode).trim() : undefined,
      emergencyContact: body?.emergencyContact != null ? String(body.emergencyContact).trim() : undefined,
      emergencyPhone: body?.emergencyPhone != null ? String(body.emergencyPhone).trim() : undefined,
      medicalHistory: body?.medicalHistory != null ? String(body.medicalHistory) : undefined,
    }

    if (!name) {
      return NextResponse.json({ message: "name is required" }, { status: 400 })
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findUnique({ where: { id: userId } })
      if (!existingUser) {
        return { ok: false as const, status: 404, message: "User not found" }
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          name,
          ...(email !== undefined ? { email } : {}),
          ...(phoneNumber !== undefined ? { phoneNumber } : {}),
          ...(dateOfBirth !== undefined ? { dateOfBirth } : {}),
        },
      })

      const updatedProfile = await tx.userProfile.upsert({
        where: { userId },
        create: {
          userId,
          address: profileData.address ?? null,
          city: profileData.city ?? null,
          state: profileData.state ?? null,
          zipCode: profileData.zipCode ?? null,
          emergencyContact: profileData.emergencyContact ?? null,
          emergencyPhone: profileData.emergencyPhone ?? null,
          medicalHistory: profileData.medicalHistory ?? null,
        },
        update: {
          ...(profileData.address !== undefined ? { address: profileData.address } : {}),
          ...(profileData.city !== undefined ? { city: profileData.city } : {}),
          ...(profileData.state !== undefined ? { state: profileData.state } : {}),
          ...(profileData.zipCode !== undefined ? { zipCode: profileData.zipCode } : {}),
          ...(profileData.emergencyContact !== undefined ? { emergencyContact: profileData.emergencyContact } : {}),
          ...(profileData.emergencyPhone !== undefined ? { emergencyPhone: profileData.emergencyPhone } : {}),
          ...(profileData.medicalHistory !== undefined ? { medicalHistory: profileData.medicalHistory } : {}),
        },
      })

      return { ok: true as const, user: updatedUser, profile: updatedProfile }
    })

    if (!result.ok) {
      return NextResponse.json({ message: result.message }, { status: result.status })
    }

    return NextResponse.json({
      userId: result.user.id,
      name: result.user.name,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber ?? "",
      dateOfBirth: toDateOnlyString(result.user.dateOfBirth),

      address: result.profile.address ?? "",
      city: result.profile.city ?? "",
      state: result.profile.state ?? "",
      zipCode: result.profile.zipCode ?? "",
      emergencyContact: result.profile.emergencyContact ?? "",
      emergencyPhone: result.profile.emergencyPhone ?? "",
      medicalHistory: result.profile.medicalHistory ?? "",
    })
  } catch (e: any) {
    const msg = String(e?.message ?? "")
    if (msg.includes("Unique constraint") || msg.includes("unique constraint")) {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 })
    }

    console.error("[PUT /api/user/profile]", e)
    return NextResponse.json({ message: "Internal error" }, { status: 500 })
  }
}
