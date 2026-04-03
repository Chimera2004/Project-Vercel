import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const apps = await prisma.appointment.findMany();
  if (apps.length > 0) {
    const updated = await prisma.appointment.update({
      where: { id: apps[0].id },
      data: { status: "WAITING_USER_CONFIRMATION" as any }
    });
    console.log("Updated appointment to WAITING_USER_CONFIRMATION:", updated.id);
  } else {
    console.log("No appointments found");
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
