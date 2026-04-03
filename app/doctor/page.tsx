"use client";

import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Contact, User, LogOut, CheckCircle2, History, AlertCircle, Play, Stethoscope, Video, MapPin, X } from "lucide-react";
import Swal from "sweetalert2";

type Appointment = {
  id: string;
  date: string;
  timeSlot: string;
  type: string;
  mode: string;
  status: string;
  notes: string;
  rescheduleRequested: boolean;
  rescheduleNote: string | null;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
  }
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "HISTORY">("UPCOMING");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [examineOpen, setExamineOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  
  // Reschedule state
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleId, setRescheduleId] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduleSubmitting, setRescheduleSubmitting] = useState(false);
  
  // Advanced Form state
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [complaint, setComplaint] = useState("");
  const [sickLeave, setSickLeave] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointments();
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/inventory");
      if (res.ok) setProducts(await res.json());
    } catch(e) {
      console.error(e);
    }
  }

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const status = activeTab === "UPCOMING" ? "UPCOMING" : "COMPLETED";
      const res = await fetch(`/api/doctor/appointments?status=${status}`);
      if(res.ok) {
        setAppointments(await res.json());
      }
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const openRescheduleDialog = (id: string) => {
    setRescheduleId(id);
    setRescheduleReason("");
    setRescheduleOpen(true);
  }

  const submitRescheduleRequest = async () => {
    if (!rescheduleId || !rescheduleReason) return;
    setRescheduleSubmitting(true);
    try {
      const res = await fetch(`/api/doctor/appointments/${rescheduleId}/request-reschedule`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rescheduleReason }),
      });
      if (res.ok) {
        setRescheduleOpen(false);
        fetchAppointments();
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Permintaan Terkirim!' });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal mengirim permintaan." });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error', text: "Terjadi kesalahan internal." });
    } finally {
      setRescheduleSubmitting(false);
    }
  }

  const openExamineDialog = (appt: Appointment) => {
    setSelectedAppt(appt);
    setComplaint(appt.notes || "");
    setDiagnosis("");
    setPrescription("");
    setNotes("");
    setBloodPressure("");
    setTemperature("");
    setWeight("");
    setSickLeave("0");
    setSelectedProducts([]);
    setExamineOpen(true);
  }

  const submitExamination = async () => {
    if (!selectedAppt || !diagnosis) return;
    setSubmitting(true);

    const selectedDrugNames = selectedProducts.length > 0 ? selectedProducts.map(p => `${p.name} (x${p.qty || 1})`).join(", ") : "Tidak ada";
    const combinedNotes = `[Vital] Tensi: ${bloodPressure || "-"} mmHg, Suhu: ${temperature || "-"} °C, Berat: ${weight || "-"} kg
[Keluhan Pasien]: ${complaint || "-"}
[Obat Apotek]: ${selectedDrugNames}
[Tindakan & Resep Tambahan]: ${prescription || "-"}
[Surat Sakit]: ${sickLeave === "0" ? "Tidak ada" : sickLeave + " Hari"}
[Catatan Internal Dokter]: ${notes || "-"}`;

    try {
      const res = await fetch("/api/doctor/examine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedAppt.id,
          diagnosis,
          prescription,
          selectedProducts,
          notes: combinedNotes,
        })
      });

      if (res.ok) {
        setExamineOpen(false);
        fetchAppointments(); 
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Rekam Medis Disimpan!' });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menyimpan rekam medis." });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error', text: "Kesalahan server saat menyimpan data." });
    } finally {
      setSubmitting(false);
    }
  }

  const timeSlotLabel = (slot: string) => {
    switch (slot) {
      case "NINE": return "09:00";
      case "TEN": return "10:00";
      case "ELEVEN": return "11:00";
      case "TWO": return "14:00";
      case "THREE": return "15:00";
      case "FOUR": return "16:00";
      default: return slot;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-gray-100 text-gray-800 border-gray-200";
      case "COMPLETED": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-primary" />
              Doctor Panel
            </h1>
            <p className="text-muted-foreground">Manage your patients and examinations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "UPCOMING" ? "default" : "outline"}
            onClick={() => setActiveTab("UPCOMING")}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Jadwal Mendatang
          </Button>
          <Button
            variant={activeTab === "HISTORY" ? "default" : "outline"}
            onClick={() => setActiveTab("HISTORY")}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Riwayat Periksa
          </Button>
        </div>

        {/* Content */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               {activeTab === "UPCOMING" ? <Calendar className="w-5 h-5 text-primary" /> : <History className="w-5 h-5 text-primary" />}
               {activeTab === "UPCOMING" ? "Antrean Pasien Mendatang" : "Arsip Pasien Selesai"}
            </CardTitle>
            <CardDescription>
               {activeTab === "UPCOMING" ? "Daftar janji temu dalam antrean Anda." : "Riwayat pemeriksaan yang telah Anda selesaikan."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
               <div className="flex justify-center items-center h-40">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
               </div>
            ) : appointments.length === 0 ? (
               <div className="text-center py-16">
                  <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">Tidak ada data untuk ditampilkan.</p>
               </div>
            ) : (
               <div className="space-y-4">
                 {appointments.map((appt) => (
                   <div key={appt.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors">
                     
                     <div className="flex items-start gap-4 mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium">{appt.user.name}</h3>
                            <Badge className={getStatusColor(appt.status)}>
                              {appt.status === "CONFIRMED" ? "Confirmed Pending" : appt.status}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {appt.mode === "ONLINE" ? (
                                <><Video className="w-3 h-3" /> Online</>
                              ) : (
                                <><MapPin className="w-3 h-3" /> In-Person</>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {appt.type.replace("_", " ")}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(appt.date), "dd MMM yyyy")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {timeSlotLabel(appt.timeSlot)}
                            </span>
                          </div>
                          {appt.notes && (
                            <p className="text-sm text-muted-foreground italic mt-2 border-l-2 border-muted pl-2">
                              Keluhan: {appt.notes}
                            </p>
                          )}
                        </div>
                     </div>

                     <div className="flex flex-col shrink-0 gap-2 mt-4 md:mt-0">
                       {activeTab === "UPCOMING" ? (
                         <>
                           <Button onClick={() => openExamineDialog(appt)} className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm">
                             <Play className="w-4 h-4 mr-2" /> Mulai Periksa
                           </Button>
                           {appt.mode === "ONLINE" && (
                             <Button onClick={() => window.open("https://zoom.us", "_blank")} variant="outline" className="w-full md:w-auto text-blue-600 border-blue-200 hover:bg-blue-50 transition shadow-sm">
                               <Video className="w-4 h-4 mr-2" /> Mulai Zoom
                             </Button>
                           )}
                            {appt.rescheduleRequested ? (
                              <Button variant="outline" className="w-full md:w-auto text-yellow-600 border-yellow-200 bg-yellow-50/50 shadow-sm" disabled>
                                <Clock className="w-4 h-4 mr-2" /> Menunggu Admin (Reschedule)
                              </Button>
                            ) : (
                              <Button onClick={() => openRescheduleDialog(appt.id)} variant="outline" className="w-full md:w-auto text-orange-600 border-orange-200 hover:bg-orange-50 transition shadow-sm">
                                <AlertCircle className="w-4 h-4 mr-2" /> Ajukan Reschedule
                              </Button>
                            )}
                         </>
                       ) : (
                         <Button variant="outline" className="w-full md:w-auto bg-transparent border-primary/20 text-primary" disabled>
                           <CheckCircle2 className="w-4 h-4 mr-2" /> Telah Selesai
                         </Button>
                       )}
                     </div>

                   </div>
                 ))}
               </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advanced SOAP Examination Dialog */}
      <Dialog open={examineOpen} onOpenChange={setExamineOpen}>
        <DialogContent className="sm:max-w-[750px] bg-background max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2 border-b pb-3">
              <Stethoscope className="w-6 h-6 text-primary" />
              Rekam Medis Klinis (SOAP)
            </DialogTitle>
            <DialogDescription className="pt-2">
              Formulir pemeriksaan standar klinik untuk <span className="font-semibold text-foreground">{selectedAppt?.user.name}</span>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-2">
            
            {/* Section 1: Tanda Vital */}
            {selectedAppt?.mode !== "ONLINE" ? (
            <div className="space-y-3 p-4 bg-muted/40 rounded-xl border border-border/50 shadow-sm">
               <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                 Tanda Vital (Objective)
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase opacity-80">Tekanan Darah</label>
                    <div className="relative">
                      <Input placeholder="120/80" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} className="h-10 pr-12 bg-background border-border/50" />
                      <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">mmHg</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase opacity-80">Suhu Badan</label>
                    <div className="relative">
                      <Input type="number" placeholder="36.5" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="h-10 pr-10 bg-background border-border/50" />
                      <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">°C</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase opacity-80">Berat Badan</label>
                    <div className="relative">
                      <Input type="number" placeholder="60" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-10 pr-10 bg-background border-border/50" />
                      <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">kg</span>
                    </div>
                  </div>
               </div>
            </div>
            ) : (
               <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 shadow-sm text-sm text-blue-800 flex items-center gap-2">
                 <Video className="w-5 h-5 opacity-70" />
                 <span>Tanda Vital (Objective) dilewati untuk pemeriksaan <strong>Online / Video Call</strong>.</span>
               </div>
            )}

            {/* Section 2: Subjective & Assessment */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Keluhan Pasien (Subjective)</label>
                <Textarea 
                  placeholder="Cerita ringkas dari pasien..." 
                  value={complaint} 
                  onChange={(e) => setComplaint(e.target.value)} 
                  className="min-h-[100px] resize-none bg-background text-sm border-border/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Diagnosa Medis (Assessment) <span className="text-red-500">*</span></label>
                <Textarea 
                  placeholder="Contoh: J06.9 Acute upper respiratory infection" 
                  value={diagnosis} 
                  onChange={(e) => setDiagnosis(e.target.value)} 
                  className="min-h-[100px] resize-none bg-background text-sm border-primary/30 focus-visible:ring-primary shadow-sm"
                />
              </div>
            </div>
            
            {/* Section 3: Plan */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Pilih Obat dari Apotek (Inventory)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedProducts.map(p => (
                     <div key={p.id} className="flex items-center gap-2 bg-blue-50 border border-blue-200 p-1.5 rounded-md">
                       <span className="text-sm text-blue-800 font-medium pl-1">{p.name}</span>
                       <Input 
                         type="number" min="1" 
                         value={p.qty || 1} 
                         onChange={(e) => {
                           const val = parseInt(e.target.value) || 1;
                           setSelectedProducts(prev => prev.map(x => x.id === p.id ? {...x, qty: val} : x));
                         }}
                         className="w-14 h-7 text-xs bg-white text-center p-1"
                       />
                       <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600 hover:bg-red-100 rounded-sm" onClick={() => setSelectedProducts(prev => prev.filter(x => x.id !== p.id))}><X className="w-3 h-3" /></Button>
                     </div>
                  ))}
                  {selectedProducts.length === 0 && (
                    <span className="text-sm text-muted-foreground italic text-muted-foreground/50">Belum ada obat yang dipilih</span>
                  )}
                </div>
                <select 
                  className="w-full h-10 px-3 border border-border/50 rounded-md bg-background text-sm shadow-sm focus:ring-primary/30"
                  onChange={(e) => {
                    const prod = products.find(p => p.id === e.target.value);
                    if(prod && !selectedProducts.find(x => x.id === prod.id)) {
                      setSelectedProducts([...selectedProducts, { ...prod, qty: 1 }]);
                    }
                    e.target.value = ""; // reset
                  }}
                  value=""
                >
                  <option value="" disabled>-- Klik daftar ini untuk mencari & memilih obat --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id} disabled={!p.inStock}>{p.name} {!p.inStock && "(Stok Habis)"}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tindakan Medis & Obat Racikan Manual (Plan)</label>
                <Textarea 
                  placeholder="Catat tindakan yang dilakukan (misal: Suntik Vitamin C) atau resep obat yang tidak ada di inventory..." 
                  value={prescription} 
                  onChange={(e) => setPrescription(e.target.value)} 
                  className="min-h-[100px] resize-none bg-background text-sm border-border/50"
                />
              </div>
            </div>

            {/* Section 4: Administration */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10 items-center">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-primary/80">Keterangan Sakit</label>
                 <div className="flex items-center gap-2">
                   <Input type="number" min="0" max="14" value={sickLeave} onChange={(e) => setSickLeave(e.target.value)} className="h-10 w-24 bg-background shadow-sm" />
                   <span className="text-sm text-muted-foreground font-medium">Hari</span>
                 </div>
               </div>
               
               <div className="flex items-center justify-end text-sm text-muted-foreground italic">
                  *Apoteker/Admin akan menghitung total tagihan akhir pasien.
               </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-slate-700">Catatan Internal Perawat/Dokter</label>
              <Input 
                placeholder="Catatan rahasia yang tidak dicetak di resep..." 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                className="h-10 bg-muted/20 text-sm border-border/50"
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4 border-t border-border/20 mt-2">
            <Button variant="ghost" onClick={() => setExamineOpen(false)}>Batalkan</Button>
            <Button onClick={submitExamination} disabled={!diagnosis || submitting} className="bg-primary text-primary-foreground hover:bg-primary/90 md:w-[220px] shadow-md">
              {submitting ? (
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                   Menyimpan...
                 </div>
              ) : "Simpan Rekam Medis"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Request Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajukan Reschedule</DialogTitle>
            <DialogDescription>
              Alasan permintaan pindah jadwal (misal: ada keperluan mendadak, sakit, dll.)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Textarea
              placeholder="Tuliskan alasan untuk Admin..."
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRescheduleOpen(false)}>Batal</Button>
            <Button onClick={submitRescheduleRequest} disabled={!rescheduleReason || rescheduleSubmitting}>
              {rescheduleSubmitting ? "Mengirim..." : "Kirim Permintaan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
