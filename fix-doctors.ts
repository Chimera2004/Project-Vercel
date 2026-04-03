import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const doctors = await prisma.doctor.findMany({
    where: { userId: null },
  });

  console.log(`Menemukan ${doctors.length} dokter lama yang belum punya akun login.`);

  const password = "Klinik123!";
  const hashedPassword = await bcrypt.hash(password, 10);

  for (const doc of doctors) {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: doc.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: doc.name,
          email: doc.email,
          password: hashedPassword,
          phoneNumber: doc.phone,
          role: "DOCTOR",
        },
      });
      console.log(`✅ [BERHASIL] Dibuatkan akun login untuk email: ${doc.email}`);
    } else {
      // If user exists, just update role
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "DOCTOR" }
      });
      console.log(`⚠️ [INFO] Email ${doc.email} sudah terdaftar, statusnya dinaikkan menjadi DOCTOR.`);
    }

    // Link doctor to user
    await prisma.doctor.update({
      where: { id: doc.id },
      data: { userId: user.id },
    });
    console.log(`🔗 Menyambungkan Profil Dokter ${doc.name} ke sistem login... Selesai.`);
  }

  console.log("🎉 SELURUH DATA DOKTER LAMA BERHASIL DIPERBAIKI!");
}

main()
  .catch((e) => {
    console.error("Terjadi error saat memperbaiki data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
