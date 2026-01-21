// app/api/appointments/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


async function getAuthUserId() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) return session.user.id;

  const cookieStore = cookies();
  const auth = cookieStore.get("auth")?.value;
  const userId = cookieStore.get("userId")?.value;
  if (auth !== "true" || !userId) return null;
  return userId;
}

export async function POST(req: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { date, timeSlot, type, mode, notes, doctorId } = await req.json();

    if (!date || !timeSlot || !type || !mode || !doctorId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctor || !doctor.isActive) {
      return NextResponse.json(
        { message: "Doctor not found or inactive" },
        { status: 400 }
      );
    }

    const existing = await prisma.appointment.findFirst({
      where: {
        doctorId,
        date: new Date(date),
        timeSlot,
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Time slot already booked" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId, // ✅ dari cookie userId
        doctorId,
        date: new Date(date),
        timeSlot,
        type,
        mode,
        notes: notes || null,
        status: "PENDING",
      },
      include: {
        doctor: true,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId }, 
      orderBy: { createdAt: "desc" },
      include: { doctor: true },
    });

    return NextResponse.json(appointments);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
