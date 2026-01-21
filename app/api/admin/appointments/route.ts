import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

function addDays(d: Date, days: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + days)
  return x
}

function startOfWeekMonday(d: Date) {
  const day = d.getDay() // 0 Sun ... 6 Sat
  const diff = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + diff)
  return startOfDay(monday)
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0)
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    if (session.user.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    const { searchParams } = new URL(req.url)
    const take = Math.min(Number(searchParams.get("take") ?? 50), 200)
    const range = (searchParams.get("range") ?? "week").toLowerCase()

    const now = new Date()
    const today = startOfDay(now)

    let dateFilter: any = undefined

    if (range === "today") {
      dateFilter = { gte: today, lte: addDays(today, 1) }
    } else if (range === "week") {
      const from = startOfWeekMonday(now)
      const to = addDays(from, 7)
      dateFilter = { gte: from, lt: to }
    } else if (range === "month") {
      const from = startOfMonth(now)
      const to = new Date(from.getFullYear(), from.getMonth() + 1, 1, 0, 0, 0, 0)
      dateFilter = { gte: from, lt: to }
    } else if (range === "all") {
      // no date filter
    } else {
      // fallback biar aman
      const from = startOfWeekMonday(now)
      const to = addDays(from, 7)
      dateFilter = { gte: from, lt: to }
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(dateFilter ? { date: dateFilter } : {}),
      },
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
      take,
      select: {
        id: true,
        date: true,
        timeSlot: true,
        status: true,
        type: true,
        mode: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { id: true, name: true, email: true } },
        doctor: { select: { id: true, name: true } },
      },
    })

    return NextResponse.json({ range, appointments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Failed to load appointments" }, { status: 500 })
  }
}
