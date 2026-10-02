"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Home, DollarSign, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActivityRange = "today" | "week" | "month";

type DashboardResponse = {
  totalPatients: number;
  appointmentsToday: number;
  newRegistrations: number;
  totalRevenue: number;
  lowStockCount: number;
  activityRange?: string;
  recentActivity: { id: string; createdAt: string; message: string }[];
};

export function DashboardView() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activityRange, setActivityRange] = useState<ActivityRange>("today");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/admin/dashboard?activityRange=${activityRange}`,
          { cache: "no-store" }
        );
        const json = (await res.json()) as DashboardResponse;

        if (!res.ok) throw new Error(json as any);

        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError("Failed to load dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activityRange]);

  const totalPatients = data?.totalPatients ?? 0;
  const appointmentsToday = data?.appointmentsToday ?? 0;
  const newRegistrations = data?.newRegistrations ?? 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm shadow-sm border-0 border-l-4 border-l-indigo-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
          <Users className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : (data?.totalPatients ?? 0).toLocaleString("id-ID")}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? error : "Data terkini dari sistem"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm shadow-sm border-0 border-l-4 border-l-violet-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Janji Temu Hari Ini
          </CardTitle>
          <Calendar className="h-4 w-4 text-violet-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.appointmentsToday ?? 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "Jumlah janji hari ini"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm shadow-sm border-0 border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pendaftaran Baru</CardTitle>
          <Home className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.newRegistrations ?? 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "Minggu ini (Senin–Hari ini)"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm shadow-sm border-0 border-l-4 border-l-emerald-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : `Rp ${(data?.totalRevenue ?? 0).toLocaleString("id-ID")}`}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "Total dari semua tagihan lunas"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm shadow-sm border-0 border-l-4 border-l-amber-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Peringatan Stok Obat</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : data?.lowStockCount ?? 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "Obat dengan stok < 10"}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 bg-card/80 backdrop-blur-sm shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Aktivitas Terkini</CardTitle>
            <p className="text-sm text-muted-foreground">
              {activityRange === "today"
                ? "Hari Ini"
                : activityRange === "week"
                ? "Minggu Ini"
                : "Bulan Ini"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={activityRange === "today" ? "default" : "outline"}
              onClick={() => setActivityRange("today")}
              disabled={loading}
            >
              Hari Ini
            </Button>
            <Button
              size="sm"
              variant={activityRange === "week" ? "default" : "outline"}
              onClick={() => setActivityRange("week")}
              disabled={loading}
            >
              Minggu Ini
            </Button>
            <Button
              size="sm"
              variant={activityRange === "month" ? "default" : "outline"}
              onClick={() => setActivityRange("month")}
              disabled={loading}
            >
              Bulan Ini
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Memuat...</p>
          ) : error ? (
            <p className="text-muted-foreground">{error}</p>
          ) : (
            <ul className="space-y-2 text-muted-foreground">
              {data?.recentActivity?.length ? (
                data.recentActivity.map((a) => (
                  <li key={a.id}>- {a.message}</li>
                ))
              ) : (
                <li>- Tidak ada aktivitas pada rentang ini.</li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
