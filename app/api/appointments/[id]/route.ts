// app/api/appointments/[id]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getAuthUserId() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) return session.user.id;

  const store = cookies();
  const auth = store.get("auth")?.value;
  const userId = store.get("userId")?.value;
  if (auth !== "true" || !userId) return null;
  return userId;
}


export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getAuthUserId();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    if (status !== "CANCELLED") {
      return NextResponse.json(
        { message: "Only CANCELLED is supported" },
        { status: 400 }
      );
    }

    // Pastikan appointment milik user ini
    const appt = await prisma.appointment.findFirst({
      where: { id: params.id, userId },
    });

    if (!appt) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
