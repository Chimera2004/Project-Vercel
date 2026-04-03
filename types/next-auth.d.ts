import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "ADMIN" | "USER" | "DOCTOR"
    } & DefaultSession["user"]
  }

  interface User {
    role: "ADMIN" | "USER" | "DOCTOR"
  }
}
