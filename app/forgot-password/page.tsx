"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <div className="relative">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
              <Shield className="w-4 h-4 text-accent absolute -top-1 -right-1" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground text-balance">Reset Password</h1>
            <p className="text-muted-foreground text-sm text-pretty">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive reset instructions"}
            </p>
          </div>
        </div>

        {/* Reset Password Card */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">{isSubmitted ? "Email Sent" : "Forgot Password"}</CardTitle>
            <CardDescription className="text-center text-pretty">
              {isSubmitted
                ? "We've sent password reset instructions to your email"
                : "We'll send you a secure link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    If an account with <strong>{email}</strong> exists, you'll receive reset instructions shortly.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full h-11 bg-background/50 border-border/50 hover:bg-accent/50"
                >
                  Try Different Email
                </Button>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary p-0 inline-flex items-center gap-1"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Sign In
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>Secure • HIPAA Compliant • Trusted by 10,000+ patients</p>
          <div className="flex justify-center gap-4">
            <Button variant="link" className="text-xs text-muted-foreground hover:text-primary p-0 h-auto">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-xs text-muted-foreground hover:text-primary p-0 h-auto">
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
