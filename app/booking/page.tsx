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
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Plus,
  History,
  X,
  CheckCircle,
  Video,
  MapPin,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Appointment {
  id: string;
  date: string;
  timeSlot: "NINE" | "TEN" | "ELEVEN" | "TWO" | "THREE" | "FOUR";
  doctorId: string;
  type: "GENERAL_CHECKUP" | "CONSULTATION" | "FOLLOW_UP" | "EMERGENCY";
  mode: "ONLINE" | "OFFLINE";
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  notes?: string;
  zoomLink?: string;
}

interface Doctor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  isActive?: boolean;
}

type BookingForm = {
  date: string;
  timeSlot: Appointment["timeSlot"];
  doctorId: string;
  type: Appointment["type"];
  mode: Appointment["mode"];
  notes?: string;
};

export default function BookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"book" | "history">("book");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments", {
          credentials: "include",
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
          console.warn("Appointments API did not return array:", data);
        }
      } catch (err) {
        console.error(err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);
  const generateZoomLink = () => {
    const meetingId = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `https://zoom.us/j/${meetingId}`;
  };

  const handleLogout = () => {
    router.push("/");
  };

  const handleProfileRedirect = () => {
    router.push("/profile");
  };

  const handleUserProfileRedirect = () => {
    router.push("/user-profile");
  };

  const handleStoreRedirect = () => {
    router.push("/store");
  };

  const cancelAppointment = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (!res.ok) return;

      const resList = await fetch("/api/appointments", {
        credentials: "include",
      });
      const list = await resList.json();

      if (Array.isArray(list)) {
        setAppointments(list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validasi input
    if (
      !bookingForm.date ||
      !bookingForm.timeSlot ||
      !bookingForm.doctorId ||
      !bookingForm.type
    ) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    try {
      // Kirim data ke backend
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          date: bookingForm.date,
          timeSlot: bookingForm.timeSlot,
          doctorId: bookingForm.doctorId,
          type: bookingForm.type,
          mode: bookingForm.mode,
          notes: bookingForm.notes,
        }),
      });

      const savedAppointment = await res.json();

      if (!res.ok) {
        // Kalau backend error (misal double booking)
        setMessage({
          text: savedAppointment.message || "Failed to book appointment",
          type: "error",
        });
        return;
      }

      // Update state appointments pakai data dari backend langsung
      const resList = await fetch("/api/appointments", {
        credentials: "include",
      });
      const list = await resList.json();

      if (Array.isArray(list)) {
        setAppointments(list);
      }

      // Reset form
      setBookingForm({
        date: "",
        timeSlot: "NINE",
        doctorId: "",
        type: "GENERAL_CHECKUP",
        mode: "OFFLINE",
        notes: "",
      });

      setMessage({ text: "Appointment booked successfully!", type: "success" });

      setTimeout(() => {
        setActiveTab("history");
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage({ text: "Internal server error", type: "error" });
    }
  };

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    date: "",
    timeSlot: "NINE",
    doctorId: "",
    type: "GENERAL_CHECKUP",
    mode: "OFFLINE",
    notes: "",
  });

  const timeSlotLabel = (slot: Appointment["timeSlot"]) => {
    switch (slot) {
      case "NINE":
        return "09:00";
      case "TEN":
        return "10:00";
      case "ELEVEN":
        return "11:00";
      case "TWO":
        return "14:00";
      case "THREE":
        return "15:00";
      case "FOUR":
        return "16:00";
      default:
        return slot;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">
              MediCare Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your appointments</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleStoreRedirect}
              className="flex items-center gap-2 bg-transparent"
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </Button>
            <Button
              variant="outline"
              onClick={handleUserProfileRedirect}
              className="flex items-center gap-2 bg-transparent"
            >
              <User className="w-4 h-4" />
              My Profile
            </Button>
            <Button
              variant="outline"
              onClick={handleProfileRedirect}
              className="flex items-center gap-2 bg-transparent"
            >
              <User className="w-4 h-4" />
              Clinic Info
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={activeTab === "book" ? "default" : "outline"}
            onClick={() => setActiveTab("book")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Booking History
          </Button>
        </div>

        {activeTab === "book" && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Book New Appointment
              </CardTitle>
              <CardDescription>
                Schedule your next medical appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleBookAppointment} className="space-y-6">
                {message && (
                  <div
                    className={`p-3 rounded-md text-sm font-medium ${
                      message.type === "error"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-green-50 text-green-700 border border-green-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date *</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, date: e.target.value })
                      }
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Time *</label>
                    <select
                      value={bookingForm.timeSlot}
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          timeSlot: e.target.value as BookingForm["timeSlot"],
                        })
                      }
                      required
                    >
                      <option value="">Choose time</option>
                      <option value="NINE">9:00 AM</option>
                      <option value="TEN">10:00 AM</option>
                      <option value="ELEVEN">11:00 AM</option>
                      <option value="TWO">2:00 PM</option>
                      <option value="THREE">3:00 PM</option>
                      <option value="FOUR">4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Doctor *</label>
                  <select
                    value={bookingForm.doctorId}
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        doctorId: e.target.value,
                      })
                    }
                  >
                    <option value="">Choose doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Appointment Type *
                  </label>
                  <select
                    value={bookingForm.type}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        type: e.target.value as Appointment["type"],
                      })
                    }
                    className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                    required
                  >
                    <option value="">Select type</option>

                    <option value="GENERAL_CHECKUP">General Checkup</option>

                    <option value="CONSULTATION">Consultation</option>

                    <option value="FOLLOW_UP">Follow-up</option>

                    <option value="EMERGENCY">Emergency</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meeting Type *</label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* ONSITE */}
                    <button
                      type="button"
                      onClick={() =>
                        setBookingForm({
                          ...bookingForm,
                          mode: "OFFLINE",
                        })
                      }
                      className={`h-11 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors ${
                        bookingForm.mode === "OFFLINE"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 border-border/50 hover:bg-background"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      In-Person Visit
                    </button>

                    {/* ONLINE */}
                    <button
                      type="button"
                      onClick={() =>
                        setBookingForm({
                          ...bookingForm,
                          mode: "ONLINE",
                        })
                      }
                      className={`h-11 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors ${
                        bookingForm.mode === "ONLINE"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 border-border/50 hover:bg-background"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Online Video Call
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, notes: e.target.value })
                    }
                    className="w-full h-20 px-3 py-2 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 resize-none"
                    placeholder="Any specific concerns or symptoms..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Appointment History
              </CardTitle>
              <CardDescription>
                View and manage your appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {doctors.find((d) => d.id === appointment.doctorId)
                              ?.name || "Unknown Doctor"}
                          </h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {appointment.mode === "ONLINE" ? (
                              <>
                                <Video className="w-3 h-3" />
                                Online
                              </>
                            ) : (
                              <>
                                <MapPin className="w-3 h-3" />
                                In-Person
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeSlotLabel(appointment.timeSlot)}
                          </span>
                        </div>
                        {appointment.mode === "ONLINE" && (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={appointment.status === "CANCELLED"}
                              onClick={() => {
                                if (appointment.status === "CANCELLED") return;
                                window.open("https://zoom.us", "_blank");
                              }}
                              className={`flex items-center gap-1 ${
                                appointment.status === "CANCELLED"
                                  ? "text-muted-foreground cursor-not-allowed opacity-60"
                                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              }`}
                            >
                              <Video className="w-3 h-3" />
                              {appointment.status === "CANCELLED"
                                ? "Video Unavailable"
                                : "Join Video Call"}
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        )}

                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground italic">
                            Notes: {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    {appointment.status !== "CANCELLED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
