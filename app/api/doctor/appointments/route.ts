import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Find the doctor record associated with this user
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
  });

  if (!doctor) {
    return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
  }

  // Find appointments
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status") || "UPCOMING";

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctor.id,
      status: statusFilter === "UPCOMING" ? { in: ["PENDING", "CONFIRMED"] } : (statusFilter as any),
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phoneNumber: true,
          dateOfBirth: true,
        }
      },
      medicalRecord: true,
    },
    orderBy: {
      date: 'asc',
    }
  });

  return NextResponse.json(appointments);
}
