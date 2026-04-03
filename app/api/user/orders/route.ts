import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        appointment: {
          include: { 
             doctor: { select: { name: true } }, 
             medicalRecord: true 
          }
        },
        orderItems: true
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("User Orders GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
