import { prisma } from './lib/prisma';
async function main() {
  const appts = await prisma.appointment.findMany({
    where: { status: 'WAITING_USER_CONFIRMATION' },
    select: { id: true, date: true, timeSlot: true, notes: true, rescheduleNote: true }
  });
  console.log(appts);
}
main().catch(console.error);
