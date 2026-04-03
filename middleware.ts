import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname

      // halaman admin → hanya ADMIN
      if (pathname.startsWith("/admin")) {
        return token?.role === "ADMIN"
      }

      // halaman doctor → hanya DOCTOR
      if (pathname.startsWith("/doctor")) {
        return token?.role === "DOCTOR"
      }

      // halaman lain bebas
      return true
    },
  },
})

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*"],
}
