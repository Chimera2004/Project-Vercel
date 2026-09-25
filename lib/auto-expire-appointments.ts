import { prisma } from "@/lib/prisma";

/**
 * Automatically auto-expire (hangus) appointments whose scheduled date is in the past
 * (before today 00:00:00) and are still in PENDING or CONFIRMED status without examination.
 */
export async function autoExpirePastAppointments() {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    await prisma.appointment.updateMany({
      where: {
        date: {
          lt: todayStart,
        },
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      data: {
        status: "CANCELLED",
      },
    });
  } catch (error) {
    console.error("Error auto-expiring past appointments:", error);
  }
}
