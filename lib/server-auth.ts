import { cookies } from "next/headers"

export async function getSession() {
  const cookieStore = cookies()

  const isAuth = cookieStore.get("auth")?.value
  const role = cookieStore.get("role")?.value

  if (!isAuth || !role) return null

  return {
    role, // "ADMIN" | "USER"
  }
}
