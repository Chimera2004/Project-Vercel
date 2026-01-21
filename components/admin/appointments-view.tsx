"use client";

import { useEffect, useMemo, useState } from "react";
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

type AppointmentRow = {
  id: string;
  date: string;
  timeSlot: string;
  status: string;
  user: { id: string; name: string; email: string };
  doctor: { id: string; name: string };
  notes?: string | null;
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
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
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

  // modal state
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AppointmentRow | null>(null);

  // form state
  const [doctorId, setDoctorId] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>(""); // YYYY-MM-DD
  const [timeSlot, setTimeSlot] = useState<string>("TEN");
  const [notes, setNotes] = useState<string>(
    "Jadwal diubah oleh klinik. Silakan cek detail appointment Anda."
  );

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
    try {
      setMutatingId(id);
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CANCEL" }),
      });
      if (!res.ok) throw new Error("Cancel failed");
      await refresh();
    } catch {
      setError("Failed to cancel appointment.");
    } finally {
      setMutatingId(null);
    }
  }

  function openEditModal(apt: AppointmentRow) {
    setEditing(apt);
    setDoctorId(apt.doctor?.id ?? "");
    setDateValue(toDateInputValue(apt.date));
    setTimeSlot(apt.timeSlot ?? "TEN");
    setNotes(
      apt.notes ??
        "Jadwal diubah oleh klinik. Silakan cek detail appointment Anda."
    );
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
          timeSlot,
          notes,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Reschedule failed");

      setOpen(false);
      setEditing(null);
      await refresh();
    } catch (e: any) {
      setError(e?.message ?? "Failed to reschedule.");
    } finally {
      setMutatingId(null);
    }
  }

  const rows = useMemo(() => appointments, [appointments]);

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
                      ? "bg-green-100 text-green-800"
                      : apt.status === "CANCELLED"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-yellow-100 text-yellow-800";

                  return (
                    <tr
                      key={apt.id}
                      className="border-b border-border/50 hover:bg-muted/50"
                    >
                      <td className="py-3 px-4">{apt.user?.name ?? "-"}</td>
                      <td className="py-3 px-4">{apt.doctor?.name ?? "-"}</td>
                      <td className="py-3 px-4">
                        {new Date(apt.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {TIME_SLOTS.find((t) => t.value === apt.timeSlot)
                          ?.label ?? apt.timeSlot}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${badgeClass}`}
                        >
                          {statusLabel(apt.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-transparent"
                          disabled={
                            apt.status === "CANCELLED" ||
                            apt.status === "COMPLETED"
                          }
                          onClick={() => openEditModal(apt)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive bg-transparent"
                          disabled={
                            mutatingId === apt.id ||
                            apt.status === "CANCELLED" ||
                            apt.status === "COMPLETED"
                          }
                          onClick={() => cancelAppointment(apt.id)}
                        >
                          {mutatingId === apt.id ? "Cancelling..." : "Cancel"}
                        </Button>
                      </td>
                    </tr>
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

                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Keterangan (shown to user)
                  </div>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
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
