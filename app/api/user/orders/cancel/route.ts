import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
       return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const orderToCancel = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!orderToCancel) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    if (orderToCancel.status === "PAID") {
      return NextResponse.json({ error: "Cannot cancel a paid order" }, { status: 400 });
    }

    if (orderToCancel.appointmentId) {
      return NextResponse.json({ error: "Cannot cancel a consultation billing" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Cancel POST Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
