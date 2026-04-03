"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DashboardView } from "@/components/admin/dashboard-view";
import { InventoryView } from "@/components/admin/inventory-view";
import { AppointmentsView } from "@/components/admin/appointments-view";
import { UsersView } from "@/components/admin/users-view";
import { PharmacyView } from "@/components/admin/pharmacy-view";
import { FulfillmentView } from "@/components/admin/fulfillment-view";
import BookingPage from "@/app/booking/page";
import StorePage from "@/app/store/page";

type AdminView = "dashboard" | "appointments" | "users" | "inventory" | "pharmacy" | "fulfillment";

export default function AdminPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [viewingAsUser, setViewingAsUser] = useState(false);
  const [userViewTab, setUserViewTab] = useState<"store" | "booking">("store");
  const handleLogout = () => {
    document.cookie = "role=; path=/; max-age=0";
    document.cookie = "token=; path=/; max-age=0";

    router.push("/");
  };

  if (viewingAsUser) {
    return (
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between p-6 border-b border-border/50 bg-card/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-foreground">Clinic Store</h1>
          <Button
            onClick={() => setViewingAsUser(false)}
            variant="outline"
            className="gap-2"
          >
            <span>👨‍💼</span>
            Back to Admin
          </Button>
        </header>

        <div className="flex gap-2 p-6 border-b border-border/50 bg-card/40">
          <Button
            variant={userViewTab === "store" ? "default" : "outline"}
            onClick={() => setUserViewTab("store")}
            className="gap-2"
          >
            <span>🛍️</span>
            Store
          </Button>
          <Button
            variant={userViewTab === "booking" ? "default" : "outline"}
            onClick={() => setUserViewTab("booking")}
            className="gap-2"
          >
            <span>📅</span>
            Booking
          </Button>
        </div>

        <main className="p-8">
          {userViewTab === "store" && (
            <div className="overflow-hidden">
              {/* Render full store page instead of sample products */}
              <StorePage />
            </div>
          )}

          {userViewTab === "booking" && (
            <div className="max-w-4xl">
              <BookingPage />
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="flex flex-col items-center w-20 py-8 space-y-6 bg-background border-r shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-semibold">
          A
        </div>
        <nav className="flex flex-col items-center space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "dashboard"
                ? "bg-primary/10"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setCurrentView("dashboard")}
            title="Dashboard"
          >
            <span
              className={`text-lg ${
                currentView === "dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              📊
            </span>
            <span className="sr-only">Dashboard</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "appointments"
                ? "bg-primary/10"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setCurrentView("appointments")}
            title="Appointments"
          >
            <span
              className={`text-lg ${
                currentView === "appointments"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              📅
            </span>
            <span className="sr-only">Appointments</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "users" ? "bg-primary/10" : "hover:bg-primary/10"
            }`}
            onClick={() => setCurrentView("users")}
            title="Users"
          >
            <span
              className={`text-lg ${
                currentView === "users"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              👥
            </span>
            <span className="sr-only">Users</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "inventory"
                ? "bg-primary/10"
                : "hover:bg-primary/10"
            }`}
             onClick={() => setCurrentView("inventory")}
            title="Inventory"
          >
            <span
              className={`text-lg ${
                currentView === "inventory"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              📦
            </span>
            <span className="sr-only">Inventory</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "pharmacy"
                ? "bg-primary/10"
                : "hover:bg-primary/10"
            }`}
             onClick={() => setCurrentView("pharmacy")}
            title="Apotek & Kasir"
          >
            <span
              className={`text-lg ${
                currentView === "pharmacy"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              💊
            </span>
            <span className="sr-only">Apotek & Kasir</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "fulfillment"
                ? "bg-primary/10"
                : "hover:bg-primary/10"
            }`}
             onClick={() => setCurrentView("fulfillment")}
            title="Logistik & Kiriman"
          >
            <span
              className={`text-lg ${
                currentView === "fulfillment"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              🚚
            </span>
            <span className="sr-only">Logistik & Kiriman</span>
          </Button>
        </nav>
        <div className="flex-grow" />
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg hover:bg-blue-500/10"
          onClick={() => setViewingAsUser(true)}
          title="View as User"
        >
          <span className="text-lg text-muted-foreground hover:text-blue-500">
            👤
          </span>
          <span className="sr-only">View as User</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <span className="text-lg text-muted-foreground hover:text-destructive">
            🚪
          </span>
          <span className="sr-only">Logout</span>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-border/50">
          <h1 className="text-3xl font-bold text-foreground">
            {currentView === "dashboard" && "Admin Dashboard"}
            {currentView === "appointments" && "Appointments"}
            {currentView === "users" && "Users"}
            {currentView === "inventory" && "Inventory Management"}
            {currentView === "pharmacy" && "Apotek & Kasir"}
            {currentView === "fulfillment" && "Logistik & Ekspedisi"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, Admin!</span>
          </div>
        </header>

        {currentView === "dashboard" && <DashboardView />}
        {currentView === "appointments" && <AppointmentsView />}
        {currentView === "users" && <UsersView />}
        {currentView === "inventory" && <InventoryView />}
        {currentView === "pharmacy" && <PharmacyView />}
        {currentView === "fulfillment" && <FulfillmentView />}
      </main>
    </div>
  );
}
