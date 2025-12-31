import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname

      // halaman admin → hanya ADMIN
      if (pathname.startsWith("/admin")) {
        return token?.role === "ADMIN"
      }

      // halaman lain bebas
      return true
    },
  },
})

export const config = {
  matcher: ["/admin/:path*"],
}
