"use client";

import { useEffect, useMemo, useState, Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

type AppointmentRow = {
  id: string;
  date: string;
  timeSlot: string;
  status: string;
  user: { id: string; name: string; email: string };
  doctor: { id: string; name: string };
  notes?: string | null;
  rescheduleRequested?: boolean;
  rescheduleNote?: string | null;
};

type DoctorOption = { id: string; name: string };
type RangeKey = "today" | "week" | "month" | "all";

const TIME_SLOTS = [
  { value: "NINE", label: "09:00" },
  { value: "TEN", label: "10:00" },
  { value: "ELEVEN", label: "11:00" },
  { value: "TWO", label: "14:00" },
  { value: "THREE", label: "15:00" },
  { value: "FOUR", label: "16:00" },
] as const;

function statusLabel(s: string) {
  const map: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    WAITING_USER_CONFIRMATION: "Waiting User Confirmation",
  };
  return map[s] ?? s;
}

function toDateInputValue(dateISO: string) {
  // dateISO -> "YYYY-MM-DD" for <input type="date">
  const d = new Date(dateISO);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function AppointmentsView() {
  const [range, setRange] = useState<RangeKey>("week");
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mutatingId, setMutatingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"ALL" | "NEED_ACTION">("ALL");

  // modal state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AppointmentRow | null>(null);

  // form state
  const [doctorId, setDoctorId] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>(""); // YYYY-MM-DD
  const [timeSlot, setTimeSlot] = useState<string>("TEN");

  async function loadAppointments(selectedRange: RangeKey) {
    const res = await fetch(
      `/api/admin/appointments?take=100&range=${selectedRange}`,
      {
        cache: "no-store",
      }
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message ?? "Failed");
    return (json.appointments ?? []) as AppointmentRow[];
  }

  async function loadDoctors() {
    const res = await fetch("/api/admin/appointments/doctors", {
      cache: "no-store",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message ?? "Failed");
    return (json.doctors ?? []) as DoctorOption[];
  }

  async function refresh() {
    try {
      setLoading(true);
      setError(null);
      const [apts, docs] = await Promise.all([
        loadAppointments(range),
        loadDoctors(),
      ]);
      setAppointments(apts);
      setDoctors(docs);
    } catch (e) {
      setError("Failed to load data.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  async function cancelAppointment(id: string) {
    const result = await Swal.fire({
      title: 'Batalkan Janji?',
      text: 'Tindakan ini tidak dapat diurungkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Batalkan'
    });
    if (!result.isConfirmed) return;

    try {
      setMutatingId(id);
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CANCEL" }),
      });
      if (!res.ok) throw new Error("Cancel failed");
      await refresh();
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Janji Dibatalkan' });
    } catch {
      setError("Failed to cancel appointment.");
      Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal membatalkan janji temu." });
    } finally {
      setMutatingId(null);
    }
  }

  function openEditModal(apt: AppointmentRow) {
    setEditing(apt);
    setDoctorId(apt.doctor?.id ?? "");
    setDateValue(toDateInputValue(apt.date));
    setTimeSlot(apt.timeSlot ?? "TEN");
    setOpen(true);
  }

  async function submitReschedule() {
    if (!editing) return;
    try {
      setMutatingId(editing.id);

      // convert YYYY-MM-DD + keep as ISO date at 00:00 local
      // server akan simpan DateTime, timeSlot yang menentukan jam slot
      const iso = new Date(dateValue + "T00:00:00").toISOString();

      const res = await fetch(`/api/admin/appointments/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RESCHEDULE",
          doctorId,
          date: iso,
          timeSlot
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Reschedule failed");

      setOpen(false);
      setEditing(null);
      await refresh();
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Jadwal Diubah!' });
    } catch (e: any) {
      setError(e?.message ?? "Failed to reschedule.");
      Swal.fire({ icon: 'error', title: 'Gagal', text: e?.message ?? "Gagal merubah jadwal." });
    } finally {
      setMutatingId(null);
    }
  }

  const rows = useMemo(() => {
    if (filterType === "NEED_ACTION") {
      return appointments.filter(a => a.rescheduleRequested || a.status === "WAITING_USER_CONFIRMATION");
    }
    return appointments;
  }, [appointments, filterType]);

  const needsActionCount = appointments.filter(a => a.rescheduleRequested || a.status === "WAITING_USER_CONFIRMATION").length;

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Upcoming Appointments</CardTitle>

        <div className="flex items-center gap-2">
          <Button
            variant={range === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("today")}
          >
            Today
          </Button>
          <Button
            variant={range === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("week")}
          >
            This Week
          </Button>
          <Button
            variant={range === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("month")}
          >
            This Month
          </Button>
          <Button
            variant={range === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setRange("all")}
          >
            All
          </Button>
        </div>
      </CardHeader>

      <div className="px-6 pb-2">
        <div className="flex gap-2">
          <Button
            variant={filterType === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("ALL")}
          >
            All Entries
          </Button>
          <Button
            variant={filterType === "NEED_ACTION" ? "destructive" : "outline"}
            size="sm"
            onClick={() => setFilterType("NEED_ACTION")}
            className="relative"
          >
            Requested Action
            {needsActionCount > 0 && (
              <span className="ml-2 flex items-center justify-center bg-white text-red-600 rounded-full h-5 w-5 text-xs font-bold shadow-sm">
                {needsActionCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <CardContent>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-sm text-muted-foreground">{error}</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No appointments in this range.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 font-medium">Pasien</th>
                  <th className="text-left py-2 px-4 font-medium">Doctor</th>
                  <th className="text-left py-2 px-4 font-medium">Date</th>
                  <th className="text-left py-2 px-4 font-medium">Time</th>
                  <th className="text-left py-2 px-4 font-medium">Status</th>
                  <th className="text-left py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((apt) => {
                  const badgeClass =
                    apt.status === "CONFIRMED"
                      ? "bg-gray-100 text-gray-800 border-gray-200 border"
                      : apt.status === "CANCELLED"
                      ? "bg-red-100 text-red-800 border-red-200 border"
                      : apt.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-800 border-blue-200 border"
                      : apt.status === "WAITING_USER_CONFIRMATION"
                      ? "bg-orange-100 text-orange-800 border-orange-200 border"
                      : "bg-gray-100 text-gray-800 border-gray-200 border";

                  return (
                    <Fragment key={apt.id}>
                    <tr
                      className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${(apt.rescheduleRequested || apt.status === "WAITING_USER_CONFIRMATION") ? "bg-red-50/30" : ""}`}
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="font-medium text-foreground">{apt.user?.name ?? "-"}</div>
                        {apt.rescheduleRequested && (
                          <div className="mt-1 text-xs text-red-600 font-semibold flex flex-col gap-1">
                            <span className="flex items-center gap-1">
                               ⚠️ Permintaan Reschedule Dokter:
                            </span>
                            <span className="p-1.5 bg-red-100 rounded-md text-red-800 break-words max-w-[200px]">
                               {apt.rescheduleNote}
                            </span>
                          </div>
                        )}
                        {apt.status === "WAITING_USER_CONFIRMATION" && !apt.rescheduleRequested && (
                          <div className="mt-1 text-xs text-yellow-600 font-semibold flex flex-col gap-1">
                            <span className="flex items-center gap-1">
                               ⏳ Menunggu Keputusan Pasien
                            </span>
                            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-800 break-words max-w-[200px]">
                               Cek kolom Status
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 align-top">{apt.doctor?.name ?? "-"}</td>
                      <td className="py-4 px-4 align-top">
                        {new Date(apt.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="py-4 px-4 align-top">
                        {TIME_SLOTS.find((t) => t.value === apt.timeSlot)
                          ?.label ?? apt.timeSlot}
                      </td>
                      <td className="py-4 px-4 align-top">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${badgeClass}`}
                        >
                          {statusLabel(apt.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            disabled={
                              apt.status === "CANCELLED" ||
                              apt.status === "COMPLETED"
                            }
                            onClick={() => openEditModal(apt)}
                          >
                            Reschedule
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
            </table>
          </div>
        )}

        {/* Reschedule Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reschedule Appointment</DialogTitle>
            </DialogHeader>

            {editing && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Patient:{" "}
                  <span className="text-foreground font-medium">
                    {editing.user?.name}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Doctor</div>
                  <Select value={doctorId} onValueChange={setDoctorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Date</div>
                  <Input
                    type="date"
                    value={dateValue}
                    onChange={(e) => setDateValue(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Time</div>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={!!mutatingId}
              >
                Close
              </Button>
              <Button
                onClick={submitReschedule}
                disabled={
                  !editing ||
                  !!mutatingId ||
                  !doctorId ||
                  !dateValue ||
                  !timeSlot
                }
              >
                {mutatingId ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
