import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { appointmentId, extraFee, extraFeeNote } = body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { medicalRecord: true }
    });

    if (!appointment || !appointment.medicalRecord) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });

    // Parse selected products from Medical Record
    let items: any[] = [];
    let autoTotal = 0;
    try {
      const parsed = JSON.parse(appointment.medicalRecord.prescription || "{}");
      if (parsed.items && Array.isArray(parsed.items)) {
        items = parsed.items;
        items.forEach(i => {
           autoTotal += (i.price || 0) * (i.qty || 1);
        });
      }
    } catch (e) {
      // Fallback
    }

    const additionalFee = parseInt(extraFee) || 0;
    const subtotal = autoTotal + additionalFee + 150000; // 150k flat consultation fee 
    const tax = Math.round(subtotal * 0.11); // 11% Tax
    const total = subtotal + tax;

    // Atomic transaction for Order, OrderItems, and Stock Deduction
    const order = await prisma.$transaction(async (tx) => {

      // Update Medical Record notes with extra fee detail if provided
      if (additionalFee > 0 && extraFeeNote) {
         await tx.medicalRecord.update({
            where: { id: appointment.medicalRecord!.id },
            data: { notes: appointment.medicalRecord!.notes + `\n\n[Biaya Tambahan]: Rp ${additionalFee.toLocaleString("id-ID")} - ${extraFeeNote}` }
         });
      }

      const createdOrder = await tx.order.create({
        data: {
          userId: appointment.userId,
          appointmentId: appointment.id,
          status: "PENDING",
          subtotal,
          shipping: 0,
          tax,
          total,
        }
      });

      // If there are inventory items prescribed by the doctor
      if (items.length > 0) {
        for (const item of items) {
           const qty = item.qty || 1;
           // Create order item
           await tx.orderItem.create({
             data: {
               orderId: createdOrder.id,
               productId: item.id,
               item_name: item.name,
               unit_price: item.price || 0,
               quantity: qty
             }
           });
           
           // Deduct stock from Inventory
           await tx.product.update({
             where: { id: item.id },
             data: { quantity: { decrement: qty } }
           });
        }
      }

      return createdOrder;
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Pharmacy Bill POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
