"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export async function logout(router: AppRouterInstance) {
  try {
    await fetch("/api/auth/logout", { method: "POST" })
  } finally {
    router.push("/")
    router.refresh()
  }
}
