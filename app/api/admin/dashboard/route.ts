import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Role, AppointmentStatus, OrderStatus } from "@prisma/client"

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}
function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
}
function startOfWeekMonday(d: Date) {
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + diff)
  return startOfDay(monday)
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)
}

type ActivityItem = {
  id: string
  createdAt: string
  message: string
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const url = new URL(req.url)
    const activityRange = (url.searchParams.get("activityRange") ?? "today").toLowerCase()

    const now = new Date()
    const todayStart = startOfDay(now)
    const todayEnd = endOfDay(now)
    const weekStart = startOfWeekMonday(now)
    const monthStart = startOfMonth(now)

    // KPI cards (tetap sama)
    const [totalPatients, appointmentsToday, newRegistrations] = await Promise.all([
      prisma.user.count({ where: { role: Role.USER } }),
      prisma.appointment.count({ where: { date: { gte: todayStart, lte: todayEnd } } }),
      prisma.user.count({ where: { role: Role.USER, createdAt: { gte: weekStart } } }),
    ])

    // Activity time window
    let activityFrom: Date
    if (activityRange === "week") activityFrom = weekStart
    else if (activityRange === "month") activityFrom = monthStart
    else activityFrom = todayStart // default today

    // Ambil sumber aktivitas dalam window (batasi hasil biar aman)
    const [latestUsers, latestAppointments, latestOrders] = await Promise.all([
      prisma.user.findMany({
        where: { role: Role.USER, createdAt: { gte: activityFrom } },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, createdAt: true },
      }),
      prisma.appointment.findMany({
        where: { updatedAt: { gte: activityFrom } },
        orderBy: { updatedAt: "desc" },
        take: 10,
        select: {
          id: true,
          status: true,
          updatedAt: true,
          user: { select: { name: true } },
          doctor: { select: { name: true } },
        },
      }),
      prisma.order.findMany({
        where: { updatedAt: { gte: activityFrom } },
        orderBy: { updatedAt: "desc" },
        take: 10,
        select: {
          id: true,
          status: true,
          updatedAt: true,
          user: { select: { name: true } },
          total: true,
        },
      }),
    ])

    const activity: ActivityItem[] = []

    for (const u of latestUsers) {
      activity.push({
        id: `user-${u.id}`,
        createdAt: u.createdAt.toISOString(),
        message: `New patient registered: ${u.name}.`,
      })
    }

    for (const a of latestAppointments) {
      const statusLabel =
        a.status === AppointmentStatus.PENDING
          ? "created"
          : a.status === AppointmentStatus.CONFIRMED
          ? "confirmed"
          : a.status === AppointmentStatus.COMPLETED
          ? "completed"
          : "cancelled"

      activity.push({
        id: `appt-${a.id}`,
        createdAt: a.updatedAt.toISOString(),
        message: `Appointment ${statusLabel} for ${a.user.name} with Dr. ${a.doctor.name}.`,
      })
    }

    for (const o of latestOrders) {
      const owner = o.user?.name ?? "Guest"
      const statusLabel =
        o.status === OrderStatus.PAID
          ? "paid"
          : o.status === OrderStatus.PENDING
          ? "created"
          : o.status === OrderStatus.FAILED
          ? "failed"
          : "cancelled"

      activity.push({
        id: `order-${o.id}`,
        createdAt: o.updatedAt.toISOString(),
        message: `Order ${statusLabel} by ${owner} (total: ${o.total}).`,
      })
    }

    activity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      totalPatients,
      appointmentsToday,
      newRegistrations,
      activityRange,
      recentActivity: activity.slice(0, 12), 
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Failed to load dashboard data" }, { status: 500 })
  }
}
