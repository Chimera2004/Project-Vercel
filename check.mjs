import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const apps = await prisma.appointment.findMany();
  console.log("Appointments in DB:", apps.length);
  apps.forEach(a => {
    console.log(`[${a.id}] User: ${a.userId}, Status: ${a.status}, Resch: ${a.rescheduleRequested}`);
  });
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
