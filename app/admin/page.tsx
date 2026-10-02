"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DashboardView } from "@/components/admin/dashboard-view";
import { InventoryView } from "@/components/admin/inventory-view";
import { AppointmentsView } from "@/components/admin/appointments-view";
import { UsersView } from "@/components/admin/users-view";
import { PharmacyView } from "@/components/admin/pharmacy-view";
import { PatientHistoryView } from "@/components/admin/patient-history-view";
import BookingPage from "@/app/booking/page";
import StorePage from "@/app/store/page";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Package, 
  Pill, 
  FileText, 
  User, 
  LogOut, 
  ShoppingBag, 
  ArrowLeft 
} from "lucide-react";

type AdminView = "dashboard" | "appointments" | "users" | "inventory" | "pharmacy" | "patient-history";

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
          <h1 className="text-2xl font-bold text-foreground">Toko Obat Klinik</h1>
          <Button
            onClick={() => setViewingAsUser(false)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Panel Admin
          </Button>
        </header>

        <div className="flex gap-2 p-6 border-b border-border/50 bg-card/40">
          <Button
            variant={userViewTab === "store" ? "default" : "outline"}
            onClick={() => setUserViewTab("store")}
            className="gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Toko Obat
          </Button>
          <Button
            variant={userViewTab === "booking" ? "default" : "outline"}
            onClick={() => setUserViewTab("booking")}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            Janji Temu
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
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("dashboard")}
            title="Dasbor"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="sr-only">Dasbor</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "appointments"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("appointments")}
            title="Janji Temu"
          >
            <Calendar className="w-5 h-5" />
            <span className="sr-only">Janji Temu</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "users" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("users")}
            title="Manajemen Dokter"
          >
            <Users className="w-5 h-5" />
            <span className="sr-only">Manajemen Dokter</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "inventory"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("inventory")}
            title="Stok & Inventaris"
          >
            <Package className="w-5 h-5" />
            <span className="sr-only">Stok & Inventaris</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "pharmacy"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("pharmacy")}
            title="Apotek & Kasir"
          >
            <Pill className="w-5 h-5" />
            <span className="sr-only">Apotek & Kasir</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-lg ${
              currentView === "patient-history"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            onClick={() => setCurrentView("patient-history")}
            title="Riwayat Pasien"
          >
            <FileText className="w-5 h-5" />
            <span className="sr-only">Riwayat Pasien</span>
          </Button>
        </nav>
        <div className="flex-grow" />
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500"
          onClick={() => setViewingAsUser(true)}
          title="Lihat Sebagai Pasien"
        >
          <User className="w-5 h-5" />
          <span className="sr-only">Lihat Sebagai Pasien</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
          title="Keluar"
        >
          <LogOut className="w-5 h-5" />
          <span className="sr-only">Keluar</span>
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-border/50">
          <h1 className="text-3xl font-bold text-foreground">
            {currentView === "dashboard" && "Dasbor Admin"}
            {currentView === "appointments" && "Janji Temu & Konsultasi"}
            {currentView === "users" && "Manajemen Dokter"}
            {currentView === "inventory" && "Stok & Inventaris Obat"}
            {currentView === "pharmacy" && "Apotek & Kasir"}
            {currentView === "patient-history" && "Riwayat Kunjungan Pasien"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Selamat datang, Admin!</span>
          </div>
        </header>

        {currentView === "dashboard" && <DashboardView />}
        {currentView === "appointments" && <AppointmentsView />}
        {currentView === "users" && <UsersView />}
        {currentView === "inventory" && <InventoryView />}
        {currentView === "pharmacy" && <PharmacyView />}
        {currentView === "patient-history" && <PatientHistoryView />}
      </main>
    </div>
  );
}
