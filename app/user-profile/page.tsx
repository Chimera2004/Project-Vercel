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
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'error',
        title: 'User ID Not Found',
        text: 'Please log in again.'
      });
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
        Swal.fire({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 3000,
          title: "Berhasil!", text: "Profile updated successfully!", icon: "success"
        });
      } else {
        Swal.fire({
          toast: true, position: 'top-end', showConfirmButton: false, timer: 3000,
          title: "Gagal", text: "Failed to update profile. Please try again.", icon: "error"
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Error saving profile. Please try again.' });
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
              Kembali
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-foreground">
                Profil Saya
              </h1>
              <p className="text-muted-foreground">
                Kelola informasi data diri dan kontak Anda
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
            variant={isEditing ? "outline" : "default"}
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Batal" : "Edit Profil"}
          </Button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informasi Data Diri
              </CardTitle>
              <CardDescription>Rincian data diri dasar Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tanggal Lahir</label>
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
                Informasi Kontak
              </CardTitle>
              <CardDescription>Kontak yang dapat dihubungi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Alamat Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nomor HP / Telepon</label>
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
                Informasi Alamat
              </CardTitle>
              <CardDescription>Alamat domisili Anda saat ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Alamat Jalan</label>
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
                  <label className="text-sm font-medium">Kota / Kabupaten</label>
                  <input
                    type="text"
                    value={userInfo.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Provinsi</label>
                  <input
                    type="text"
                    value={userInfo.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    disabled={!isEditing}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kode Pos</label>
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
                Kontak Darurat
              </CardTitle>
              <CardDescription>
                Kerabat / keluarga yang dapat dihubungi dalam kondisi darurat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Kontak Darurat</label>
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
                  <label className="text-sm font-medium">Nomor Telepon Kontak Darurat</label>
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
                Riwayat Kesehatan
              </CardTitle>
              <CardDescription>Informasi riwayat medis penting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Catatan Riwayat Penyakit & Alergi
                </label>
                <textarea
                  value={userInfo.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full h-24 px-3 py-2 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 resize-none disabled:opacity-60 text-sm"
                  placeholder="Alergi obat/makanan, riwayat operasi, konsumsi obat rutin, dll."
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
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
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
