import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, shippingAddress } = body;

    if (!orderId) {
       return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    // Fetch the order with its items to reduce stock
    const orderToPay = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true }
    });

    if (!orderToPay) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    if (orderToPay.status === "PAID") {
      return NextResponse.json({ error: "Order already paid" }, { status: 400 });
    }

    // Atomic transaction: update order status + decrement stock
    const order = await prisma.$transaction(async (tx) => {
      let updatedTotal = orderToPay.total;
      let updatedShipping = orderToPay.shipping;

      if (shippingAddress) {
         // Create shipping address linked to order
         await tx.shippingAddress.create({
            data: {
              orderId: orderId,
              full_name: shippingAddress.full_name,
              phone: shippingAddress.phone,
              email: shippingAddress.email,
              address: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              zipCode: shippingAddress.zipCode
            }
         });
         
         // Only apply flat rate if not already applied (e.g., store orders may already have shipping cost)
         if (orderToPay.shipping === 0) {
           updatedShipping = 15000;
           updatedTotal += 15000;
         }
      }

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: "PAID", total: updatedTotal, shipping: updatedShipping },
      });

      // ONLY decrement stock for Native Store Orders. (Pharmacy appointments decrement during billing creation)
      if (!orderToPay.appointmentId) {
        for (const item of orderToPay.orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: { quantity: { decrement: item.quantity } },
          });
        }
      }

      return updatedOrder;
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Payment POST Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
