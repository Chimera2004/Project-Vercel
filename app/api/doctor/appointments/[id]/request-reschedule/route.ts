import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "DOCTOR") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const doctor = await prisma.doctor.findFirst({
      where: { userId: session.user.id },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json({ error: "Reason is required" }, { status: 400 });
    }

    // Verify the appointment belongs to this doctor
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    });

    if (!appointment || appointment.doctorId !== doctor.id) {
      return NextResponse.json({ error: "Invalid appointment" }, { status: 400 });
    }

    // Update appointment to flag it requires reschedule
    await prisma.appointment.update({
      where: { id: params.id },
      data: { 
        rescheduleRequested: true,
        rescheduleNote: reason
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
