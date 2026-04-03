import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "PAID";

  try {
    const orders = await prisma.order.findMany({
      where: {
        status: status,
      },
      include: {
        user: { select: { name: true, phoneNumber: true, email: true } },
        shippingAddress: true,
        orderItems: true,
        appointment: { select: { mode: true } }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET Admin Orders Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { orderId, status } = body;

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("PATCH Admin Orders Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
