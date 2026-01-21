import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  AppointmentStatus,
  AppointmentTimeSlot,
  AppointmentMode,
  AppointmentType,
} from "@prisma/client"

type PatchBody =
  | {
      action: "CANCEL"
      notes?: string
    }
  | {
      action: "CONFIRM"
      notes?: string
    }
  | {
      action: "RESCHEDULE"
      date: string // ISO string
      timeSlot: AppointmentTimeSlot
      doctorId: string
      mode?: AppointmentMode
      type?: AppointmentType
      notes?: string
    }

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { id } = await ctx.params
    const body = (await req.json()) as PatchBody

    const existing = await prisma.appointment.findUnique({
      where: { id },
      select: { id: true, status: true },
    })

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    // Biar aman: appointment completed tidak boleh diutak-atik
    if (existing.status === AppointmentStatus.COMPLETED) {
      return NextResponse.json(
        { message: "Completed appointment cannot be changed" },
        { status: 400 }
      )
    }

    if (body.action === "CANCEL") {
      const updated = await prisma.appointment.update({
        where: { id },
        data: {
          status: AppointmentStatus.CANCELLED,
          notes: body.notes ?? null,
        },
        select: {
          id: true,
          status: true,
          date: true,
          timeSlot: true,
          doctorId: true,
          notes: true,
          updatedAt: true,
        },
      })
      return NextResponse.json({ appointment: updated })
    }

    if (body.action === "CONFIRM") {
      const updated = await prisma.appointment.update({
        where: { id },
        data: {
          status: AppointmentStatus.CONFIRMED,
          notes: body.notes ?? null,
        },
        select: {
          id: true,
          status: true,
          date: true,
          timeSlot: true,
          doctorId: true,
          notes: true,
          updatedAt: true,
        },
      })
      return NextResponse.json({ appointment: updated })
    }

    if (body.action === "RESCHEDULE") {
      const updated = await prisma.appointment.update({
        where: { id },
        data: {
          date: new Date(body.date),
          timeSlot: body.timeSlot,
          doctorId: body.doctorId,
          // optional changes (kalau kamu mau)
          ...(body.mode ? { mode: body.mode } : {}),
          ...(body.type ? { type: body.type } : {}),

          // ini sesuai konsep kita: setelah diubah, status balik PENDING
          status: AppointmentStatus.PENDING,

          // notes untuk jelasin ke user tanpa ubah total UI user
          notes:
            body.notes ??
            "Jadwal diubah oleh klinik. Silakan cek detail appointment Anda.",
        },
        select: {
          id: true,
          status: true,
          date: true,
          timeSlot: true,
          doctorId: true,
          notes: true,
          updatedAt: true,
        },
      })
      return NextResponse.json({ appointment: updated })
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { message: "Failed to update appointment" },
      { status: 500 }
    )
  }
}
