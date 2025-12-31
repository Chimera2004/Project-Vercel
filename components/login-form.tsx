"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

// Custom SVG icons
const EyeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.4 16,13V16C16,17.4 15.4,18 14.8,18H9.2C8.6,18 8,17.4 8,16V13C8,12.4 8.6,11.5 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10.5V11.5H13.5V10.5C13.5,8.7 12.8,8.2 12,8.2Z" />
  </svg>
);

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Added email validation error state
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false);

  const googleAccounts = [
    {
      email: "john.doe@gmail.com",
      name: "John Doe",
      avatar: "JD",
      phone: "123-456-7890",
      dateOfBirth: "1990-01-01",
      address: "123 Main St",
      emergencyContact: "Jane Doe - 987-654-3210",
    },
    {
      email: "sarah.smith@gmail.com",
      name: "Sarah Smith",
      avatar: "SS",
      phone: "555-123-4567",
      dateOfBirth: "1985-05-15",
      address: "456 Oak Ave",
      emergencyContact: "Mike Smith - 555-987-6543",
    },
    {
      email: "doctor.wilson@gmail.com",
      name: "Dr. Wilson",
      avatar: "DW",
      phone: "777-888-9999",
      dateOfBirth: "1975-12-10",
      address: "789 Medical Plaza",
      emergencyContact: "Hospital - 777-000-1111",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      // NextAuth Credentials login (backend check password via authorize + bcrypt)
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setError("Invalid email or password");
        return;
      }

      // OPTIONAL: ambil role dari server (biar redirect sesuai role)
      const who = await fetch("/api/auth/whoami");
      const whoData = await who.json();

      const role = whoData?.user?.role;

      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/booking");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    setShowGoogleAccounts(true);
  };

  const handleGoogleAccountSelect = (selectedAccount: any) => {
    const googleUser = {
      ...selectedAccount,
      loginMethod: "google",
    };

    localStorage.setItem("currentUser", JSON.stringify(googleUser));

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const existingUser = registeredUsers.find(
      (u: any) => u.email === googleUser.email
    );

    if (!existingUser) {
      registeredUsers.push(googleUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    }

    setShowGoogleAccounts(false);
    router.push("/booking");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <div className="relative">
            <HeartIcon />
            <div className="absolute -top-1 -right-1">
              <ShieldIcon />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground text-balance">
            Welcome to MediCare
          </h1>
          <p className="text-muted-foreground text-sm text-pretty">
            Your trusted healthcare companion
          </p>
        </div>
      </div>

      <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center text-pretty">
            Access your health records and appointments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

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
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Sign In
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground hover:text-primary p-0"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot your password?
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 bg-background/50 border-border/50 hover:bg-accent/50"
              onClick={handleGoogleLogin}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>

      {showGoogleAccounts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Choose an account</CardTitle>
              <CardDescription>to continue to MediCare</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {googleAccounts.map((account, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full h-auto p-4 justify-start hover:bg-gray-50"
                  onClick={() => handleGoogleAccountSelect(account)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {account.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {account.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {account.email}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}

              <div className="border-t pt-2 mt-4">
                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 justify-start hover:bg-gray-50"
                  onClick={() => {
                    const customEmail = prompt("Enter your Google email:");
                    if (customEmail) {
                      const customAccount = {
                        email: customEmail,
                        name: customEmail.split("@")[0],
                        avatar: customEmail.charAt(0).toUpperCase(),
                        phone: "000-000-0000",
                        dateOfBirth: "1990-01-01",
                        address: "Not provided",
                        emergencyContact: "Not provided",
                      };
                      handleGoogleAccountSelect(customAccount);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        Use another account
                      </div>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="pt-2">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:bg-gray-50"
                  onClick={() => setShowGoogleAccounts(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Secure • HIPAA Compliant • Trusted by 10,000+ patients</p>
        <div className="flex justify-center gap-4">
          <Button
            variant="link"
            className="text-xs text-muted-foreground hover:text-primary p-0 h-auto"
          >
            Privacy Policy
          </Button>
          <Button
            variant="link"
            className="text-xs text-muted-foreground hover:text-primary p-0 h-auto"
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
}
