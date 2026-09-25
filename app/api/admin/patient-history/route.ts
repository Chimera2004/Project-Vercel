import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all"; // 'week', 'month', 'all'
  const search = searchParams.get("search") || "";

  const now = new Date();
  
  // Start of week (7 days ago)
  const startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  // Start of month (1st day of current month)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Build date filter condition
  let dateCondition: any = {};
  if (filter === "week") {
    dateCondition = { gte: startOfWeek };
  } else if (filter === "month") {
    dateCondition = { gte: startOfMonth };
  }

  // Where query
  const whereQuery: any = {
    status: { in: ["COMPLETED", "CONFIRMED"] },
    ...(dateCondition.gte ? { date: dateCondition } : {}),
  };

  if (search) {
    whereQuery.user = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phoneNumber: { contains: search, mode: "insensitive" } },
      ],
    };
  }

  try {
    // 1. Fetch appointments matching query
    const appointments = await prisma.appointment.findMany({
      where: whereQuery,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            dateOfBirth: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        medicalRecord: true,
        order: {
          select: {
            id: true,
            status: true,
            total: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    // 2. Compute overall stats for Admin Overview
    const totalVisits = await prisma.appointment.count({
      where: { status: { in: ["COMPLETED", "CONFIRMED"] } },
    });

    const thisWeekVisits = await prisma.appointment.count({
      where: {
        status: { in: ["COMPLETED", "CONFIRMED"] },
        date: { gte: startOfWeek },
      },
    });

    const thisMonthVisits = await prisma.appointment.count({
      where: {
        status: { in: ["COMPLETED", "CONFIRMED"] },
        date: { gte: startOfMonth },
      },
    });

    // 3. Format response
    const formattedData = appointments.map((appt) => {
      const isPaid = appt.order?.status === "PAID" || (appt.medicalRecord !== null && appt.status === "COMPLETED");
      return {
        id: appt.id,
        date: appt.date,
        timeSlot: appt.timeSlot,
        type: appt.type,
        mode: appt.mode,
        status: appt.status,
        notes: appt.notes,
        user: appt.user,
        doctor: appt.doctor,
        medicalRecord: appt.medicalRecord,
        paymentStatus: isPaid ? "PAID" : "PENDING",
      };
    });

    return NextResponse.json({
      stats: {
        totalVisits,
        thisWeekVisits,
        thisMonthVisits,
      },
      history: formattedData,
    });
  } catch (error) {
    console.error("Error fetching admin patient history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
