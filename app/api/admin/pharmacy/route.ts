import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const unbilledAppointments = await prisma.appointment.findMany({
      where: {
        status: "COMPLETED",
        order: null, 
      },
      include: {
        user: { select: { name: true, phoneNumber: true } },
        doctor: { select: { name: true } },
        medicalRecord: true,
      },
      orderBy: { date: "asc" }
    });

    return NextResponse.json(unbilledAppointments);
  } catch (error) {
    console.error("Pharmacy GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
