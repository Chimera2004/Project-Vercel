import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("Admin_1234", 10)

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name:  "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })

  console.log(" Admin seeded")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
