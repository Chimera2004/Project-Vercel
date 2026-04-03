import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status"); 
  
  try {
    const orders = await prisma.order.findMany({
      where: statusFilter ? { status: statusFilter as any } : undefined,
      include: {
        user: { select: { name: true, email: true } },
        appointment: { 
          include: { 
            doctor: { select: { name: true } },
            medicalRecord: true
          } 
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Pharmacy Orders GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
