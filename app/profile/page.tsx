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
            Back
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
            <CardTitle className="text-3xl font-bold text-foreground">MediCare Clinic</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Your trusted healthcare companion
            </CardDescription>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Award className="h-3 w-3 mr-1" />
                Certified
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                <Shield className="h-3 w-3 mr-1" />
                HIPAA Compliant
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                About Our Clinic
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                MediCare Clinic has been serving the community for over 15 years, providing comprehensive healthcare
                services with a focus on patient-centered care. Our team of experienced healthcare professionals is
                dedicated to delivering the highest quality medical care in a comfortable and welcoming environment.
              </p>
            </div>

            <Separator />

            {/* Services Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "General Medicine",
                  "Preventive Care",
                  "Chronic Disease Management",
                  "Health Screenings",
                  "Vaccinations",
                  "Minor Procedures",
                  "Laboratory Services",
                  "Telemedicine Consultations",
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
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Healthcare Drive
                        <br />
                        Medical District, MD 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@medicareClinic.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                    { day: "Emergency", hours: "24/7 On-Call" },
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
              <h3 className="text-xl font-semibold mb-4">Our Impact</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Users, label: "Patients Served", value: "10,000+" },
                  { icon: Calendar, label: "Years of Service", value: "15+" },
                  { icon: Star, label: "Patient Rating", value: "4.9/5" },
                  { icon: Award, label: "Certifications", value: "12" },
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
                Book Appointment
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-11 bg-transparent"
                onClick={() => window.open("tel:+15551234567")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
