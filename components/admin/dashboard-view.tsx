"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActivityRange = "today" | "week" | "month";

type DashboardResponse = {
  totalPatients: number;
  appointmentsToday: number;
  newRegistrations: number;
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
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : totalPatients.toLocaleString("en-US")}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? error : "Live data from database"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Appointments Today
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : appointmentsToday}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "Count for today"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            New Registrations
          </CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? "..." : newRegistrations}
          </div>
          <p className="text-xs text-muted-foreground">
            {error ? "—" : "This week (Mon–Today)"}
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">
              {activityRange === "today"
                ? "Today"
                : activityRange === "week"
                ? "This week"
                : "This month"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={activityRange === "today" ? "default" : "outline"}
              onClick={() => setActivityRange("today")}
              disabled={loading}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant={activityRange === "week" ? "default" : "outline"}
              onClick={() => setActivityRange("week")}
              disabled={loading}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={activityRange === "month" ? "default" : "outline"}
              onClick={() => setActivityRange("month")}
              disabled={loading}
            >
              Month
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-muted-foreground">{error}</p>
          ) : (
            <ul className="space-y-2 text-muted-foreground">
              {data?.recentActivity?.length ? (
                data.recentActivity.map((a) => (
                  <li key={a.id}>- {a.message}</li>
                ))
              ) : (
                <li>- No activity in this range.</li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
