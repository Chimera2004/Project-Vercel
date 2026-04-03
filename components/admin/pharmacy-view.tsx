"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Package, User, Pill, ArrowRightCircle, CheckCircle2, Clock, Receipt } from "lucide-react";
import Swal from "sweetalert2";

type PharmacyAppointment = {
  id: string;
  date: string;
  user: { name: string; phoneNumber: string };
  doctor: { name: string };
  medicalRecord: {
    diagnosis: string;
    prescription: string;
    notes: string;
  } | null;
}

type OrderRecord = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  appointment: PharmacyAppointment | null;
}

type ActiveTab = "UNBILLED" | "PENDING" | "PAID";

export function PharmacyView() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("UNBILLED");
  const [unbilledList, setUnbilledList] = useState<PharmacyAppointment[]>([]);
  const [orderList, setOrderList] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog State
  const [openBill, setOpenBill] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<PharmacyAppointment | null>(null);
  const [extraFee, setExtraFee] = useState("");
  const [extraFeeNote, setExtraFeeNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab: ActiveTab) => {
    setLoading(true);
    try {
      if (tab === "UNBILLED") {
        const res = await fetch("/api/admin/pharmacy");
        if (res.ok) setUnbilledList(await res.json());
      } else {
        const res = await fetch(`/api/admin/pharmacy/orders?status=${tab}`);
        if (res.ok) setOrderList(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  let autoTotal = 0;
  if (selectedAppt?.medicalRecord?.prescription) {
     try {
       const parsed = JSON.parse(selectedAppt.medicalRecord.prescription);
       if (parsed.items && Array.isArray(parsed.items)) {
          parsed.items.forEach((i: any) => { autoTotal += (i.price || 0) * (i.qty || 1); });
       }
     } catch(e) {}
  }

  const openApptBill = (appt: PharmacyAppointment) => {
    setSelectedAppt(appt);
    setExtraFee("");
    setExtraFeeNote("");
    setOpenBill(true);
  }

  const confirmBill = async () => {
    if (!selectedAppt) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/pharmacy/bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedAppt.id,
          extraFee: extraFee || "0",
          extraFeeNote
        })
      });
      if (res.ok) {
        setOpenBill(false);
        fetchData("UNBILLED");
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Tagihan Diterbitkan!' });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menerbitkan tagihan apotek." });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error Server', text: "Terjadi kesalahan internal." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }

  return (
    <div className="space-y-6">
      
      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeTab === "UNBILLED" ? "default" : "outline"} 
          onClick={() => setActiveTab("UNBILLED")}
          className="flex items-center gap-2"
        >
          <Pill className="w-4 h-4" /> Butuh Dihitung (Billed)
        </Button>
        <Button 
          variant={activeTab === "PENDING" ? "default" : "outline"} 
          onClick={() => setActiveTab("PENDING")}
          className="flex items-center gap-2"
        >
          <Clock className="w-4 h-4" /> Menunggu Pembayaran
        </Button>
        <Button 
          variant={activeTab === "PAID" ? "default" : "outline"} 
          onClick={() => setActiveTab("PAID")}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Sudah Lunas (Histori)
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
             {activeTab === "UNBILLED" ? "Antrean Kasir & Apotek" : activeTab === "PENDING" ? "Tagihan Belum Dibayar" : "Riwayat Lunas"}
          </CardTitle>
          <CardDescription>
             {activeTab === "UNBILLED" 
               ? "Menunggu penagihan resep obat dari data periksa dokter yang telah selesai." 
               : activeTab === "PENDING" 
                 ? "Daftar tagihan obat yang sudah dikirim ke pasien namun belum dilunasi." 
                 : "Arsip seluruh tagihan periksa & resep yang sudah berhasil dibayar oleh pasien."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
             <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
          ) : activeTab === "UNBILLED" ? (
             // RENDERING UNBILLED APPOINTMENTS
             unbilledList.length === 0 ? (
               <div className="text-center p-12 text-muted-foreground border border-dashed rounded-lg bg-slate-50/30">
                 🎉 Wah, semua pasien sudah ditagih. Tidak ada antrean apotek!
               </div>
             ) : (
               <div className="space-y-4">
                 {unbilledList.map(appt => (
                   <div key={appt.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors gap-4">
                     <div>
                       <div className="flex items-center gap-2">
                         <h3 className="font-semibold text-lg">{appt.user.name}</h3>
                         <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">Pending Bill Compute</Badge>
                       </div>
                       <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                         <User className="w-3.5 h-3.5" /> Dokter: {appt.doctor.name} • {format(new Date(appt.date), "dd MMM yyyy")}
                       </p>
                     </div>
                     <Button onClick={() => openApptBill(appt)} className="w-full md:w-auto shadow-sm">
                       Terbitkan Tagihan <ArrowRightCircle className="w-4 h-4 ml-2" />
                     </Button>
                   </div>
                 ))}
               </div>
             )
          ) : (
             // RENDERING PENDING OR PAID ORDERS
             orderList.length === 0 ? (
               <div className="text-center p-12 text-muted-foreground border border-dashed rounded-lg bg-slate-50/30">
                 Tidak ada data riwayat di tab ini.
               </div>
             ) : (
               <div className="space-y-4">
                 {orderList.map(order => (
                   <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors gap-4">
                     <div className="flex items-start gap-4">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${order.status === "PAID" ? "bg-green-100" : "bg-blue-100"}`}>
                         <Receipt className={`w-6 h-6 ${order.status === "PAID" ? "text-green-600" : "text-blue-600"}`} />
                       </div>
                       <div>
                         <div className="flex items-center gap-2">
                           <h3 className="font-semibold text-lg">{order.user?.name || "Anonim"}</h3>
                           <Badge variant="outline" className={order.status === "PAID" ? "text-green-700 bg-green-50 border-green-200" : "text-blue-700 bg-blue-50 border-blue-200"}>
                             {order.status === "PAID" ? "Sudah Lunas" : "Waiting Payment"}
                           </Badge>
                         </div>
                         <p className="text-sm text-slate-500 mt-1">
                           ID Tagihan: {order.id.slice(-8).toUpperCase()} • Dibuat: {format(new Date(order.createdAt), "dd MMM HH:mm")}
                         </p>
                         {order.appointment?.medicalRecord && (
                           <p className="text-xs text-slate-400 mt-1 truncate max-w-[200px] sm:max-w-md">
                             Diagnosa: {order.appointment.medicalRecord.diagnosis}
                           </p>
                         )}
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Tagihan</p>
                       <p className="text-lg font-bold text-slate-800">{formatCurrency(order.total)}</p>
                     </div>
                   </div>
                 ))}
               </div>
             )
          )}
        </CardContent>
      </Card>

      {/* Bill Processing Dialog */}
      <Dialog open={openBill} onOpenChange={setOpenBill}>
        <DialogContent className="sm:max-w-[700px] bg-background">
          <DialogHeader>
            <DialogTitle>Kalkulasi Tagihan (Billing)</DialogTitle>
            <DialogDescription>
              Tinjau resep obat dan tetapkan harga total tagihan untuk <span className="font-semibold text-foreground">{selectedAppt?.user.name}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 py-4">
             {/* Readonly Section */}
             <div className="space-y-4 p-4 bg-muted/30 border border-border/50 rounded-lg">
               <h4 className="font-semibold text-sm border-b pb-2 mb-2">Rekam Medis Dokter</h4>
               
               <div className="space-y-1">
                 <span className="text-xs text-muted-foreground font-medium uppercase">Diagnosa (Assessment)</span>
                 <p className="text-sm bg-background p-2 rounded border border-border/50">{selectedAppt?.medicalRecord?.diagnosis || "-"}</p>
               </div>

               <div className="space-y-1">
                 <span className="text-xs text-muted-foreground font-medium uppercase">Notes Obat & Tindakan (Plan)</span>
                 <pre className="text-sm bg-background p-2 rounded border border-border/50 whitespace-pre-wrap font-sans">
                   {selectedAppt?.medicalRecord?.notes || "Tidak ada catatan obat tambahan."}
                 </pre>
               </div>
             </div>

             {/* Pricing Section */}
             <div className="space-y-4 flex flex-col justify-between">
                <div className="bg-blue-50 text-blue-900 p-4 rounded-lg border border-blue-100 space-y-3">
                   <h4 className="text-sm font-semibold border-b border-blue-200 pb-2">Rincian Komponen Biaya</h4>
                   <div className="flex justify-between items-center text-sm">
                     <span>Konsultasi Dokter Dasar</span>
                     <span className="font-semibold">Rp 150.000</span>
                   </div>
                   
                   <div className="pt-2 border-t border-blue-200/50">
                     <span className="text-xs font-semibold uppercase opacity-80 mb-1 block">Rincian Obat Apotek (Sistem)</span>
                     {(() => {
                        try {
                          const parsed = JSON.parse(selectedAppt?.medicalRecord?.prescription || "{}");
                          if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
                            return parsed.items.map((i: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-sm py-0.5">
                                <span>{i.name} (x{i.qty || 1})</span>
                                <span>{formatCurrency((i.price || 0) * (i.qty || 1))}</span>
                              </div>
                            ));
                          }
                        } catch(e) {}
                        return <div className="text-xs italic opacity-70">Tidak ada obat dari sistem inventory</div>;
                     })()}
                   </div>
                   {autoTotal > 0 && (
                     <div className="flex justify-between items-center text-sm font-semibold border-t border-blue-200/50 pt-2">
                       <span>Subtotal Obat Apotek</span>
                       <span>{formatCurrency(autoTotal)}</span>
                     </div>
                   )}
                </div>

                <div className="space-y-3 p-4 bg-muted/30 border border-border/50 rounded-lg">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                       Biaya Tambahan Lengkap (Manual / Rekam Medis)
                     </label>
                     <Input 
                        type="number" 
                        placeholder="Contoh: 50000" 
                        value={extraFee} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExtraFee(e.target.value)} 
                        className="h-10 shadow-sm"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                       Keterangan Biaya Tambahan
                     </label>
                     <Input 
                        type="text" 
                        placeholder="Misal: Biaya Suntik Vitamin & Resep Tambahan" 
                        value={extraFeeNote} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExtraFeeNote(e.target.value)} 
                        className="h-10 shadow-sm text-sm"
                     />
                   </div>
                </div>

                <div className="bg-slate-800 text-white p-4 rounded-lg flex justify-between items-center mt-2 shadow-sm">
                   <span className="font-semibold">Total Tagihan (Belum PPN):</span>
                   <span className="text-xl font-bold">{formatCurrency((parseInt(extraFee) || 0) + autoTotal + 150000)}</span>
                </div>
             </div>
          </div>

          <DialogFooter>
             <Button variant="outline" onClick={() => setOpenBill(false)}>Batalkan</Button>
             <Button onClick={confirmBill} disabled={isSubmitting}>
               {isSubmitting ? "Memproses..." : "Terbitkan Tagihan"}
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
