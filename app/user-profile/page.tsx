"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Save,
  Edit3,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",

    // profile
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/user/profile");
        if (!response.ok) throw new Error("Failed to load profile");

        const data = await response.json();

        setUserId(data.userId ?? null);
        setUserInfo({
          name: data.name ?? "",
          email: data.email ?? "",
          phoneNumber: data.phoneNumber ?? "",
          dateOfBirth: data.dateOfBirth ?? "",
          address: data.address ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          zipCode: data.zipCode ?? "",
          emergencyContact: data.emergencyContact ?? "",
          emergencyPhone: data.emergencyPhone ?? "",
          medicalHistory: data.medicalHistory ?? "",
        });
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleBack = () => {
    router.push("/booking");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userInfo }),
      });

      if (response.ok) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground">
                My Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your personal information
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
            variant={isEditing ? "outline" : "default"}
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>How we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={userInfo.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Address Information
              </CardTitle>
              <CardDescription>Your current address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street Address</label>
                <input
                  type="text"
                  value={userInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    value={userInfo.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <input
                    type="text"
                    value={userInfo.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ZIP Code</label>
                  <input
                    type="text"
                    value={userInfo.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Person to contact in case of emergency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Name</label>
                  <input
                    type="text"
                    value={userInfo.emergencyContact}
                    onChange={(e) =>
                      handleInputChange("emergencyContact", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Phone</label>
                  <input
                    type="tel"
                    value={userInfo.emergencyPhone}
                    onChange={(e) =>
                      handleInputChange("emergencyPhone", e.target.value)
                    }
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Medical History
              </CardTitle>
              <CardDescription>Important medical information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Medical History & Notes
                </label>
                <textarea
                  value={userInfo.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full h-24 px-3 py-2 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 resize-none disabled:opacity-60"
                  placeholder="Allergies, previous surgeries, medications, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
