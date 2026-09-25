import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch patient info
    const patientUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        dateOfBirth: true,
      },
    });

    if (!patientUser) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Fetch past appointments with medical records
    const historyAppointments = await prisma.appointment.findMany({
      where: {
        userId,
        medicalRecord: { isNot: null },
      },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        medicalRecord: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const formattedRecords = historyAppointments.map((appt) => ({
      appointmentId: appt.id,
      date: appt.date,
      timeSlot: appt.timeSlot,
      type: appt.type,
      mode: appt.mode,
      doctorName: appt.doctor.name,
      medicalRecord: {
        id: appt.medicalRecord?.id,
        diagnosis: appt.medicalRecord?.diagnosis,
        prescription: appt.medicalRecord?.prescription,
        notes: appt.medicalRecord?.notes,
        createdAt: appt.medicalRecord?.createdAt,
      },
    }));

    return NextResponse.json({
      patient: patientUser,
      records: formattedRecords,
    });
  } catch (error) {
    console.error("Error fetching doctor patient history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
