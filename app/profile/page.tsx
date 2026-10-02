"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Shield, MapPin, Phone, Mail, Users, Award, Stethoscope, Calendar, Star, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompanyProfile() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </div>

        {/* Main Profile Card */}
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Heart className="h-16 w-16 text-primary" fill="currentColor" />
                <Shield className="h-8 w-8 text-accent absolute -bottom-1 -right-1" fill="currentColor" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">Klinik MediCare</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Mitra layanan kesehatan terpercaya Anda
            </CardDescription>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Award className="h-3 w-3 mr-1" />
                Tersertifikasi Resmi
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                <Shield className="h-3 w-3 mr-1" />
                Standar Keamanan Medis
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Tentang Klinik Kami
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Klinik MediCare telah melayani masyarakat selama lebih dari 15 tahun, menyediakan layanan kesehatan
                komprehensif yang berfokus pada kenyamanan dan keselamatan pasien. Tim profesional medis berpengalaman
                kami berdedikasi memberikan perawatan medis kualitas terbaik dalam lingkungan yang ramah dan nyaman.
              </p>
            </div>

            <Separator />

            {/* Services Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Layanan Medis Kami</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Pemeriksaan Dokter Umum",
                  "Pencegahan & Wellness",
                  "Pengelolaan Penyakit Kronis",
                  "Medical Check-Up (MCU)",
                  "Vaksinasi & Imunisasi",
                  "Tindakan Medis Ringan",
                  "Layanan Laboratorium",
                  "Konsultasi Dokter Online",
                ].map((service, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Informasi Kontak</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Alamat Klinik</p>
                      <p className="text-sm text-muted-foreground">
                        Jl. Kesehatan No. 123
                        <br />
                        Kawasan Medis, Jakarta Pusat 10110
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Nomor Telepon</p>
                      <p className="text-sm text-muted-foreground">(021) 555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Alamat Email</p>
                      <p className="text-sm text-muted-foreground">info@medicareclinic.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
                <div className="space-y-2">
                  {[
                    { day: "Senin - Jumat", hours: "08:00 - 18:00 WIB" },
                    { day: "Sabtu", hours: "09:00 - 14:00 WIB" },
                    { day: "Minggu", hours: "Tutup" },
                    { day: "UGD / Darurat", hours: "24 Jam Siaga" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-background/30 rounded">
                      <span className="text-sm font-medium">{schedule.day}</span>
                      <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Stats Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Pencapaian & Statistik</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Pasien Terlayani", value: "10.000+" },
                  { icon: Calendar, label: "Tahun Pengalaman", value: "15+" },
                  { icon: Star, label: "Rating Kepuasan", value: "4.9/5" },
                  { icon: Award, label: "Sertifikat Medis", value: "12" },
                ].map((stat, index) => (
                  <Card key={index} className="text-center p-4 bg-background/30 border-0">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1 h-11" onClick={() => router.push("/booking")}>
                <Calendar className="h-4 w-4 mr-2" />
                Buat Janji Temu
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 bg-transparent"
                onClick={() => window.open("tel:+62215551234")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Hubungi Sekarang
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
