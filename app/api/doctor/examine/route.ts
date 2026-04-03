import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
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
  const { appointmentId, diagnosis, prescription, selectedProducts, notes, medicinePrice } = body;

  if (!appointmentId || !diagnosis) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify the appointment belongs to this doctor
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment || appointment.doctorId !== doctor.id) {
    return NextResponse.json({ error: "Invalid appointment" }, { status: 400 });
  }

  // 1. Create Medical Record
  let medicalRecord;
  try {
     const combinedPrescription = JSON.stringify({
       manual: prescription || "",
       items: selectedProducts || []
     });

     medicalRecord = await prisma.medicalRecord.create({
      data: {
        appointmentId,
        diagnosis,
        prescription: combinedPrescription,
        notes,
      }
    });
  } catch(e) {
    return NextResponse.json({ error: "Record already exists or failed" }, { status: 400 });
  }

  // 2. Change Appointment status to COMPLETED
  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "COMPLETED" },
  });

  return NextResponse.json({ success: true, medicalRecord });
}
