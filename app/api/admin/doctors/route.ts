import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod";
import bcrypt from "bcryptjs";

// ================= VALIDATION =================

const createDoctorSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

const updateDoctorSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  isActive: z.boolean().optional(),
});

// ================= GET =================
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(doctors);
}

// ================= POST =================
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = createDoctorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format(), { status: 400 });
  }

  const { name, email, phone } = parsed.data;

  // 1. Create a User with DOCTOR role and default password
  const defaultPassword = "Klinik123!";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);
  
  let userId: string | null = null;
  
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber: phone || null,
        role: "DOCTOR",
      },
    });
    userId = user.id;
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Email already exists in the system" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create authentication user" }, { status: 500 });
  }

  // 2. Create the Doctor profile linked to the user
  const doctor = await prisma.doctor.create({
    data: {
      name,
      email,
      phone,
      userId,
    },
  });

  return NextResponse.json(doctor);
}

// ================= PUT =================
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = updateDoctorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(parsed.error.format(), { status: 400 });
  }

  const { id, ...data } = parsed.data;

  // 1. Get current doctor profile to find linked userId
  const existingDoctor = await prisma.doctor.findUnique({
    where: { id },
  });

  if (!existingDoctor) {
    return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
  }

  // 2. Update Doctor profile
  const updatedDoctor = await prisma.doctor.update({
    where: { id },
    data,
  });

  // 3. Update linked User account (used by NextAuth for login)
  if (existingDoctor.userId) {
    try {
      await prisma.user.update({
        where: { id: existingDoctor.userId },
        data: {
          ...(data.name ? { name: data.name } : {}),
          ...(data.email ? { email: data.email } : {}),
          ...(data.phone ? { phoneNumber: data.phone } : {}),
        },
      });
    } catch (e: any) {
      console.error("Failed to update linked user account:", e);
    }
  }

  return NextResponse.json(updatedDoctor);
}

// ================= DELETE =================
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Doctor ID required" }, { status: 400 });
  }

  try {
    // Find the doctor first to get the userId and check appointments
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: { appointments: true },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Jika dokter memiliki riwayat periksa/appointment, gunakan SOFT DELETE (deaktivasi)
    // demi menjaga integritas data klinis & rekam medis pasien sesuai standar medis.
    if (doctor.appointments && doctor.appointments.length > 0) {
      // Set isActive = false pada profil dokter
      await prisma.doctor.update({
        where: { id },
        data: { isActive: false },
      });

      return NextResponse.json({
        success: true,
        isSoftDelete: true,
        message: "Akun dokter dinonaktifkan (Soft Delete) untuk menjaga integritas rekam medis pasien.",
      });
    }

    // Jika belum pernah ada riwayat periksa (dokter baru), boleh HARD DELETE
    await prisma.doctor.delete({
      where: { id },
    });

    // Delete the linked User account if it exists
    if (doctor.userId) {
      await prisma.user.delete({
        where: { id: doctor.userId },
      }).catch((e) => console.error("Failed to delete linked user:", e));
    }

    return NextResponse.json({ success: true, isSoftDelete: false });
  } catch (error: any) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
