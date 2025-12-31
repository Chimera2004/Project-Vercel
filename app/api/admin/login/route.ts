import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.user.findUnique({ where: { email } });

  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("role", "ADMIN", {
    httpOnly: true,
    path: "/",
  });

  return res;
}
