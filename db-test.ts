import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allAppointments = await prisma.appointment.findMany();
  console.log("ALL APPOINTMENTS STATUSES:", allAppointments.map(a => a.status));
  const waiting = await prisma.appointment.findMany({
    where: { status: "WAITING_USER_CONFIRMATION" as any }
  });
  console.log("WAITING APPOINTMENTS COUNT:", waiting.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
