"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Search, User, Stethoscope, FileText, CheckCircle2, Clock, MapPin, Video, Eye, Filter, RefreshCw } from "lucide-react";

type PatientHistoryItem = {
  id: string;
  date: string;
  timeSlot: string;
  type: string;
  mode: string;
  status: string;
  notes: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    dateOfBirth: string | null;
  };
  doctor: {
    id: string;
    name: string;
    email: string;
  };
  medicalRecord: {
    id: string;
    diagnosis: string;
    prescription: string | null;
    notes: string | null;
  } | null;
  paymentStatus: "PAID" | "PENDING";
};

type Stats = {
  totalVisits: number;
  thisWeekVisits: number;
  thisMonthVisits: number;
};

import { formatPrescription } from "@/lib/prescription-formatter";

export function PatientHistoryView() {
  const [history, setHistory] = useState<PatientHistoryItem[]>([]);
  const [stats, setStats] = useState<Stats>({ totalVisits: 0, thisWeekVisits: 0, thisMonthVisits: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");
  const [search, setSearch] = useState("");
  
  // Modal state for detail
  const [selectedItem, setSelectedItem] = useState<PatientHistoryItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [filter]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filter !== "all") query.set("filter", filter);
      if (search) query.set("search", search);

      const res = await fetch(`/api/admin/patient-history?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (e) {
      console.error("Failed to fetch patient history:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory();
  };

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

  return (
    <div className="space-y-6">
      
      {/* Header & Stats Cards */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Riwayat Kunjungan Pasien</h2>
        <p className="text-muted-foreground">Arsip lengkap rekam medis & riwayat pemeriksaan pasien klinik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-border/60 shadow-sm bg-gradient-to-br from-blue-50/50 to-card">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kunjungan Minggu Ini</p>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{stats.thisWeekVisits}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm bg-gradient-to-br from-emerald-50/50 to-card">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kunjungan Bulan Ini</p>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.thisMonthVisits}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm bg-gradient-to-br from-purple-50/50 to-card">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Riwayat Selesai</p>
              <h3 className="text-3xl font-extrabold text-purple-600 mt-1">{stats.totalVisits}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls: Filter Buttons & Search Bar */}
      <Card className="border shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Period Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Periode:
            </span>
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              Semua Waktu
            </Button>
            <Button
              size="sm"
              variant={filter === "week" ? "default" : "outline"}
              onClick={() => setFilter("week")}
            >
              Minggu Ini
            </Button>
            <Button
              size="sm"
              variant={filter === "month" ? "default" : "outline"}
              onClick={() => setFilter("month")}
            >
              Bulan Ini
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Cari pasien / email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Button type="submit" size="sm" variant="secondary" className="gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Cari
            </Button>
          </form>

        </CardContent>
      </Card>

      {/* Main Data Table */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Daftar Riwayat Kunjungan</CardTitle>
          <CardDescription>Menampilkan pasien yang telah menyelesaikan pemeriksaan medis.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Tidak ada riwayat kunjungan yang ditemukan.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase border-b">
                  <tr>
                    <th className="p-3">Tanggal & Waktu</th>
                    <th className="p-3">Pasien</th>
                    <th className="p-3">Dokter Penanggung Jawab</th>
                    <th className="p-3">Diagnosa Medis</th>
                    <th className="p-3">Status Bayar</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-medium text-foreground">
                          {format(new Date(item.date), "dd MMM yyyy")}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {timeSlotLabel(item.timeSlot)}
                          <Badge variant="outline" className="text-[10px] px-1 py-0 ml-1">
                            {item.mode === "ONLINE" ? "Online" : "Klinik"}
                          </Badge>
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" /> {item.user.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.user.email}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-medium text-foreground flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" /> {item.doctor.name}
                        </div>
                      </td>

                      <td className="p-3 max-w-xs">
                        {item.medicalRecord ? (
                          <span className="line-clamp-1 font-medium text-foreground">
                            {item.medicalRecord.diagnosis}
                          </span>
                        ) : (
                          <span className="text-xs italic text-muted-foreground">Belum ada diagnosa</span>
                        )}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        {item.paymentStatus === "PAID" ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            LUNAS
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                            MENUNGGU
                          </Badge>
                        )}
                      </td>

                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => {
                            setSelectedItem(item);
                            setDetailOpen(true);
                          }}
                        >
                          <Eye className="w-3.5 h-3.5" /> Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Kunjungan Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 border-b pb-3 text-xl">
              <FileText className="w-5 h-5 text-primary" /> Detail Riwayat Kunjungan Pasien
            </DialogTitle>
            <DialogDescription>
              Informasi lengkap rekam medis & status kunjungan.
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-5 py-2">
              
              {/* Pasien Info */}
              <div className="p-4 bg-muted/40 rounded-xl border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Data Pasien</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs">Nama Lengkap</span>
                    <span className="font-semibold text-foreground">{selectedItem.user.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Email</span>
                    <span className="font-medium text-foreground">{selectedItem.user.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">No. HP</span>
                    <span className="font-medium text-foreground">{selectedItem.user.phoneNumber || "-"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs">Status Pembayaran</span>
                    <Badge className={selectedItem.paymentStatus === "PAID" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}>
                      {selectedItem.paymentStatus === "PAID" ? "LUNAS" : "MENUNGGU"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Kunjungan & Dokter */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2 text-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">Informasi Kunjungan</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-blue-600 block">Dokter Penanggung Jawab</span>
                    <span className="font-semibold text-blue-950">{selectedItem.doctor.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 block">Waktu Pemeriksaan</span>
                    <span className="font-medium text-blue-950">
                      {format(new Date(selectedItem.date), "dd MMMM yyyy")} ({timeSlotLabel(selectedItem.timeSlot)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Rekam Medis (SOAP) */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold border-b pb-1">Hasil Rekam Medis (SOAP)</h4>
                
                {selectedItem.medicalRecord ? (
                  <div className="space-y-3 text-sm">
                    <div className="bg-background p-3 rounded-lg border">
                      <span className="text-xs font-bold text-primary block uppercase mb-1">Diagnosa Medis</span>
                      <p className="text-foreground whitespace-pre-line">{selectedItem.medicalRecord.diagnosis}</p>
                    </div>

                    {selectedItem.medicalRecord.prescription && (
                      <div className="bg-background p-3 rounded-lg border">
                        <span className="text-xs font-bold text-emerald-600 block uppercase mb-1">Resep & Obat</span>
                        <p className="text-foreground whitespace-pre-line font-medium text-xs">
                          {formatPrescription(selectedItem.medicalRecord.prescription)}
                        </p>
                      </div>
                    )}

                    {selectedItem.medicalRecord.notes && (
                      <div className="bg-background p-3 rounded-lg border">
                        <span className="text-xs font-bold text-muted-foreground block uppercase mb-1">Catatan Tambahan / Vital</span>
                        <p className="text-muted-foreground whitespace-pre-line text-xs">{selectedItem.medicalRecord.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm italic text-muted-foreground">Belum ada rekam medis yang dicatat oleh dokter.</p>
                )}
              </div>

            </div>
          )}

          <DialogFooter className="pt-2 border-t">
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
