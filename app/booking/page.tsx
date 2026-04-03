"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, LogOut, Plus, History, X, CheckCircle, Video, MapPin, ExternalLink, ShoppingBag, Receipt, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface Appointment {
  id: string; date: string; timeSlot: string; doctorId: string;
  type: string; mode: string; status: string; notes?: string; zoomLink?: string;
}

interface Doctor { id: string; name: string; email?: string; phone?: string; isActive?: boolean; }
type BookingForm = { date: string; timeSlot: string; doctorId: string; type: string; mode: string; notes?: string; };

export default function BookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"book" | "history">("book");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [reproposeModalOpen, setReproposeModalOpen] = useState(false);
  const [reproposeTarget, setReproposeTarget] = useState<Appointment | null>(null);
  const [reproposeForm, setReproposeForm] = useState({ date: "", timeSlot: "TEN", doctorId: "" });

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments", { credentials: "include" });
        const data = await res.json();
        if (Array.isArray(data)) setAppointments(data);
        else setAppointments([]);
      } catch (err) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    document.cookie = "role=; path=/; max-age=0";
    document.cookie = "token=; path=/; max-age=0";
    router.push("/");
  };

  const cancelAppointment = async (id: string) => {
    const result = await Swal.fire({
      title: 'Batalkan Janji?',
      text: "Anda yakin ingin membatalkan jadwal ini? Tindakan ini tidak bisa dibatalkan.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Batalkan!'
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ status: "CANCELLED" }),
      });
      if (!res.ok) {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Could not cancel appointment." });
        return;
      }
      const resList = await fetch("/api/appointments", { credentials: "include" });
      const list = await resList.json();
      if (Array.isArray(list)) setAppointments(list);
      
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Janji dibatalkan' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: "Internal server error occurred." });
    }
  };

  const deleteAppointment = async (id: string) => {
    const result = await Swal.fire({
      title: 'Hapus dari Riwayat?',
      text: "Riwayat janji temu ini akan dihapus secara permanen.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!'
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE", credentials: "include",
      });
      if (!res.ok) {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menghapus jadwal." });
        return;
      }
      const resList = await fetch("/api/appointments", { credentials: "include" });
      const list = await resList.json();
      if (Array.isArray(list)) setAppointments(list);
      
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Riwayat dihapus' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: "Internal server error occurred." });
    }
  };

  const submitRepropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reproposeTarget) return;
    try {
      const curDate = new Date(reproposeForm.date);
      curDate.setHours(0, 0, 0, 0); // Convert to midnight local time to avoid timezone shift

      const res = await fetch(`/api/appointments/${reproposeTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_SCHEDULE",
          date: curDate.toISOString(),
          timeSlot: reproposeForm.timeSlot,
          doctorId: reproposeForm.doctorId,
        })
      });
      if (!res.ok) throw new Error("Gagal mengajukan jadwal");
      
      setReproposeModalOpen(false);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Jadwal balasan telah diajukan ke klinik.' });
      const resList = await fetch("/api/appointments", { credentials: "include" });
      const list = await resList.json();
      if (Array.isArray(list)) setAppointments(list);
    } catch (e: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: e.message });
    }
  };

  const confirmAppointment = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Could not update appointment." });
        return;
      }
      const resList = await fetch("/api/appointments", { credentials: "include" });
      const list = await resList.json();
      if (Array.isArray(list)) setAppointments(list);
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Jadwal Dikonfirmasi' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: "Internal server error occurred." });
    }
  };

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingForm.date || !bookingForm.timeSlot || !bookingForm.doctorId || !bookingForm.type) {
      Swal.fire({ icon: 'error', title: 'Data Belum Lengkap', text: "Pastikan semua data bertanda * sudah diisi." });
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify(bookingForm),
      });

      const savedAppointment = await res.json();

      if (!res.ok) {
        Swal.fire({ icon: 'error', title: 'Booking Gagal', text: savedAppointment.message || "Gagal membuat janji temu." });
        return;
      }

      const resList = await fetch("/api/appointments", { credentials: "include" });
      const list = await resList.json();
      if (Array.isArray(list)) setAppointments(list);

      setBookingForm({ date: "", timeSlot: "NINE", doctorId: "", type: "GENERAL_CHECKUP", mode: "OFFLINE", notes: "" });
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Booking!',
        text: 'Jadwal Anda berhasil dibuat.'
      });

      setTimeout(() => {
        setActiveTab("history");
      }, 1000);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error Server', text: "Terjadi kesalahan internal server." });
    }
  };

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    date: "", timeSlot: "NINE", doctorId: "", type: "GENERAL_CHECKUP", mode: "OFFLINE", notes: "",
  });

  const timeSlotLabel = (slot: string) => {
    const map: Record<string, string> = { "NINE": "09:00", "TEN": "10:00", "ELEVEN": "11:00", "TWO": "14:00", "THREE": "15:00", "FOUR": "16:00" };
    return map[slot] || slot;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-gray-100 text-gray-800 border-gray-200";
      case "PENDING": return "bg-gray-100 text-gray-800 border-gray-200";
      case "WAITING_USER_CONFIRMATION": return "bg-orange-100 text-orange-800 border-orange-200";
      case "COMPLETED": return "bg-blue-100 text-blue-800 border-blue-200";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Global Notification Banner */}
        {appointments.filter(a => a.status === "WAITING_USER_CONFIRMATION").length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-3 text-yellow-800">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
              </span>
              <p className="font-semibold text-sm md:text-base">Klinik mengajukan perubahan jadwal. Mohon respon segera!</p>
            </div>
            <Button size="sm" onClick={() => setActiveTab("history")} className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-sm shrink-0 w-full sm:w-auto">
              Lihat Detail Jadwal
            </Button>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground">MediCare Dashboard</h1>
            <p className="text-muted-foreground">Manage your appointments</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/billing")} className="flex items-center gap-2 bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors">
              <Receipt className="w-4 h-4" /> Billing
            </Button>
            <Button variant="outline" onClick={() => router.push("/store")} className="flex items-center gap-2 bg-transparent">
              <ShoppingBag className="w-4 h-4" /> Store
            </Button>
            <Button variant="outline" onClick={() => router.push("/user-profile")} className="flex items-center gap-2 bg-transparent">
              <User className="w-4 h-4" /> My Profile
            </Button>
            <Button variant="outline" onClick={() => router.push("/profile")} className="flex items-center gap-2 bg-transparent">
              <User className="w-4 h-4" /> Clinic Info
            </Button>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent hover:text-red-500 hover:border-red-200">
              <LogOut className="w-4 h-4" /> Exit
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant={activeTab === "book" ? "default" : "outline"} onClick={() => setActiveTab("book")} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Book Appointment
          </Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => setActiveTab("history")} className="flex items-center gap-2">
            <History className="w-4 h-4" /> Booking History
          </Button>
        </div>

        {activeTab === "book" && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Book New Appointment
              </CardTitle>
              <CardDescription>Schedule your next medical appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleBookAppointment} className="space-y-6">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date *</label>
                    <input
                      type="date" required min={new Date().toISOString().split("T")[0]}
                      value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Time *</label>
                    <select
                      required value={bookingForm.timeSlot} onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value as any })}
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Doctor *</label>
                    <select
                      required value={bookingForm.doctorId} onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                    >
                      <option value="">Choose doctor</option>
                      {doctors.map((doc) => <option key={doc.id} value={doc.id}>{doc.name}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Appointment Type *</label>
                    <select
                      required value={bookingForm.type} onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value as any })}
                      className="w-full h-11 px-3 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50"
                    >
                      <option value="">Select type</option>
                      <option value="GENERAL_CHECKUP">General Checkup</option>
                      <option value="CONSULTATION">Consultation</option>
                      <option value="FOLLOW_UP">Follow-up</option>
                      <option value="EMERGENCY">Emergency</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Meeting Type *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setBookingForm({ ...bookingForm, mode: "OFFLINE" })} className={`h-11 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors ${bookingForm.mode === "OFFLINE" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background/50 border-border/50 hover:bg-background"}`}>
                      <MapPin className="w-4 h-4" /> In-Person Visit
                    </button>
                    <button type="button" onClick={() => setBookingForm({ ...bookingForm, mode: "ONLINE" })} className={`h-11 px-4 rounded-md border flex items-center justify-center gap-2 transition-colors ${bookingForm.mode === "ONLINE" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background/50 border-border/50 hover:bg-background"}`}>
                      <Video className="w-4 h-4" /> Online Video Call
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes} onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full h-24 px-3 py-2 rounded-md border border-border/50 bg-background/50 focus:bg-background focus:border-primary/50 resize-none text-sm"
                    placeholder="Any specific concerns or symptoms..."
                  />
                </div>

                <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 flex items-center gap-2 shadow-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" /> Appointment History
              </CardTitle>
              <CardDescription>View and manage your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30 gap-4 hover:border-primary/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${appointment.status === "COMPLETED" ? "bg-blue-100" : appointment.status === "CANCELLED" ? "bg-red-100" : "bg-primary/10"}`}>
                        <User className={`w-6 h-6 ${appointment.status === "COMPLETED" ? "text-blue-600" : appointment.status === "CANCELLED" ? "text-red-500" : "text-primary"}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{doctors.find((d) => d.id === appointment.doctorId)?.name || "Unknown Doctor"}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status === "WAITING_USER_CONFIRMATION" ? "Waiting For Confirmation" : (appointment.status === "CONFIRMED" ? "Confirmed Pending" : appointment.status)}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {appointment.mode === "ONLINE" ? <><Video className="w-3 h-3 text-blue-500" /> Online</> : <><MapPin className="w-3 h-3 text-green-600" /> In-Person</>}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{appointment.type.replace("_", " ")}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(appointment.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeSlotLabel(appointment.timeSlot)}</span>
                        </div>
                        
                        {appointment.mode === "ONLINE" && appointment.status !== "CANCELLED" && appointment.status !== "COMPLETED" && (
                          <div className="flex items-center gap-2 mt-3">
                            <Button variant="outline" size="sm" onClick={() => window.open("https://zoom.us", "_blank")} className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
                              <Video className="w-3 h-3" /> Join Video Call <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        )}
                        {appointment.notes && appointment.status !== "WAITING_USER_CONFIRMATION" && <p className="text-sm text-muted-foreground italic mt-2 border-l-2 border-slate-200 pl-2">Notes: {appointment.notes}</p>}

                        {appointment.status === "WAITING_USER_CONFIRMATION" && (
                          <div className="w-full mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg shadow-sm">
                            <p className="text-sm text-yellow-900 font-semibold mb-2">Pihak klinik mengajukan perubahan jadwal baru untuk Anda:</p>
                            {(() => {
                              let oldDateStr = null;
                              let displayNotes = appointment.notes || "";
                              if (displayNotes.startsWith("Jadwal dipindah")) {
                                const match = displayNotes.match(/Dari:\s*(.+?)\n/);
                                if (match) oldDateStr = match[1];
                                displayNotes = displayNotes.replace(/Jadwal dipindah:\nDari:.*?\nMenjadi:.*?(?:\n\n|$)/s, "").trim();
                              }
                              return (
                                <>
                                  <div className="bg-white border border-yellow-300 rounded-md p-3 mb-3 text-sm">
                                    <p><strong>Jadwal Lama: </strong> <span className="text-black">{oldDateStr ? oldDateStr : <span className="italic text-muted-foreground">(Data tidak tersedia untuk jadwal terdahulu)</span>}</span></p>
                                    <p><strong>Jadwal Baru: </strong> <span className="text-black">{new Date(appointment.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} ({timeSlotLabel(appointment.timeSlot)})</span></p>
                                  </div>
                                  {displayNotes && (
                                    <div className="bg-yellow-100 border border-yellow-200 rounded-md p-3 mb-3">
                                      <p className="text-sm text-yellow-800 font-medium italic whitespace-pre-wrap">{displayNotes}</p>
                                    </div>
                                  )}
                                </>
                              );
                            })()}
                            <p className="text-sm text-yellow-900 font-semibold mb-3">Silakan tentukan keputusan Anda:</p>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" onClick={() => confirmAppointment(appointment.id, "CONFIRMED")} className="bg-green-600 hover:bg-green-700 text-white shadow-sm flex items-center gap-1 w-full sm:w-auto"><CheckCircle className="w-4 h-4"/> Terima Jadwal Baru</Button>
                              <Button size="sm" variant="outline" onClick={() => { 
                                setReproposeTarget(appointment); 
                                setReproposeForm({ date: appointment.date.split("T")[0], timeSlot: appointment.timeSlot, doctorId: appointment.doctorId }); 
                                setReproposeModalOpen(true); 
                              }} className="border-blue-400 text-blue-700 hover:bg-blue-50 flex items-center gap-1 w-full sm:w-auto"><Calendar className="w-4 h-4"/> Ajukan Jadwal Lain / Ganti Dokter</Button>
                              <Button size="sm" variant="outline" onClick={() => window.open("https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20berdiskusi%20mengenai%20jadwal%20klinik", "_blank")} className="border-green-400 text-green-700 hover:bg-green-50 flex items-center gap-1 w-full sm:w-auto"><ExternalLink className="w-4 h-4"/> Hubungi Klinik via WA</Button>
                              <Button size="sm" variant="outline" onClick={() => cancelAppointment(appointment.id)} className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 flex items-center gap-1 w-full sm:w-auto"><X className="w-4 h-4"/> Tolak & Batal</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {appointment.status !== "CANCELLED" && appointment.status !== "COMPLETED" && appointment.status !== "WAITING_USER_CONFIRMATION" && (
                      <Button variant="outline" size="sm" onClick={() => cancelAppointment(appointment.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 shrink-0">
                        <X className="w-4 h-4 mr-1" /> Cancel Appointment
                      </Button>
                    )}
                    {appointment.status === "CANCELLED" && (
                      <Button variant="ghost" size="icon" onClick={() => deleteAppointment(appointment.id)} className="text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 md:self-center" title="Hapus dari Riwayat">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                ))}
                {appointments.length === 0 && (
                   <p className="text-center text-muted-foreground py-8">You have no appointment history.</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={reproposeModalOpen} onOpenChange={setReproposeModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={submitRepropose}>
            <DialogHeader>
              <DialogTitle>Ajukan Perubahan Jadwal Baru</DialogTitle>
              <DialogDescription>
                Pilih tanggal, waktu, atau dokter alternatif jika jadwal dari klinik tidak cocok.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dokter Pilihan</label>
                <select required value={reproposeForm.doctorId} onChange={(e) => setReproposeForm({ ...reproposeForm, doctorId: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background form-select text-sm">
                  <option value="">Pilih Dokter</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tanggal</label>
                <input type="date" required min={new Date().toISOString().split("T")[0]} value={reproposeForm.date} onChange={(e) => setReproposeForm({ ...reproposeForm, date: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background form-input text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Waktu (Jam)</label>
                <select required value={reproposeForm.timeSlot} onChange={(e) => setReproposeForm({ ...reproposeForm, timeSlot: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background form-select text-sm">
                  <option value="NINE">09:00 AM</option>
                  <option value="TEN">10:00 AM</option>
                  <option value="ELEVEN">11:00 AM</option>
                  <option value="TWO">02:00 PM</option>
                  <option value="THREE">03:00 PM</option>
                  <option value="FOUR">04:00 PM</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setReproposeModalOpen(false)}>Kembali</Button>
              <Button type="submit">Kirim Balasan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
