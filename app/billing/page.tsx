"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Receipt, CreditCard, ArrowLeft, CheckCircle2, History, Eye } from "lucide-react";
import Swal from "sweetalert2";

interface OrderItem {
  id: string;
  item_name: string;
  unit_price: number;
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  createdAt: string;
  appointment?: { id: string; mode: string; doctor: { name: string }; medicalRecord?: { diagnosis: string; notes: string; prescription?: string; } }
  orderItems?: OrderItem[];
}

export default function BillingPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"ALL" | "CONSULTATION" | "PHARMACY">("ALL");

  // Payment simulator status
  const [payOrder, setPayOrder] = useState<Order | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  
  // Info Box status
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Delivery & Profile logic
  const [deliveryMode, setDeliveryMode] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [shippingInfo, setShippingInfo] = useState({
     full_name: "", phone: "", email: "", address: "", city: "", state: "", zipCode: ""
  });

  const fetchProfile = async () => {
     try {
       const res = await fetch("/api/user/profile");
       if (res.ok) {
          const json = await res.json();
          if (json.data) {
             const data = json.data;
             setShippingInfo({
                full_name: data.name || "",
                email: data.email || "",
                phone: data.phoneNumber || "",
                address: data.profile?.address || "",
                city: data.profile?.city || "",
                state: data.profile?.state || "Jawa Barat",
                zipCode: data.profile?.zipCode || ""
             });
          }
       }
     } catch (e) {}
  };

  useEffect(() => {
    fetchOrders();
    fetchProfile();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/orders", { credentials: "include" });
      if (res.ok) setOrders(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
       setLoading(false);
    }
  };

  const executePayment = async () => {
    if (!payOrder) return;
    const orderId = payOrder.id;

    // Build payload
    let payloadArg: any = { orderId };
    if (payOrder.appointment?.mode === "ONLINE" && deliveryMode === "DELIVERY") {
       if (!shippingInfo.full_name || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city || !shippingInfo.zipCode) {
           Swal.fire({ icon: 'error', title: 'Data Tidak Lengkap', text: "Mohon lengkapi seluruh form nama, telepon, dan alamat." });
           return;
       }
       payloadArg.shippingAddress = shippingInfo;
    }

    setPayOrder(null); // Menutup Shadcn Dialog agar Swal bisa tampil sempurna di lapisan teratas
    setIsPaying(true);
    try {
      const res = await fetch("/api/user/orders/pay", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadArg)
      });
      if (res.ok) {
        setPayOrder(null);
        fetchOrders();
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Pembayaran Berhasil' });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'error', title: 'Payment Error' });
    } finally {
      setIsPaying(false);
    }
  };

  const executeCancel = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'Batalkan Pesanan',
      text: 'Apakah Anda yakin ingin membatalkan pesanan obat ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Batalkan!'
    });
    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/user/orders/cancel", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      });
      if (res.ok) {
        fetchOrders();
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Pesanan Dibatalkan' });
      } else {
        const errorData = await res.json();
        Swal.fire({ icon: 'error', title: 'Gagal Membatalkan', text: errorData.error || "Failed to cancel order" });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Internal error occurred.' });
    }
  };

  const handleOpenInfoBox = (o: Order) => {
    setViewOrder(o);
  }

  const formatCurrency = (amt: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amt);

  const filteredOrders = orders.filter(o => {
    if (filterType === "CONSULTATION") return !!o.appointment;
    if (filterType === "PHARMACY") return !o.appointment;
    return true;
  });

  const pendingOrders = filteredOrders.filter(o => o.status === "PENDING");
  const paidOrders = filteredOrders.filter(o => o.status === "PAID");

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center gap-4 border-b border-border/50 pb-4">
            <Button variant="ghost" onClick={() => router.push("/booking")} className="p-2 border border-slate-200">
               <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Receipt className="w-6 h-6 text-indigo-600" />
                Tagihan & Kasir
              </h1>
              <p className="text-muted-foreground">Selesaikan administrasi kesehatan Anda di sini.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 py-2">
             <Button variant={filterType === "ALL" ? "default" : "outline"} onClick={() => setFilterType("ALL")} size="sm" className={filterType === "ALL" ? "bg-indigo-600 hover:bg-indigo-700" : ""}>Semua Transaksi</Button>
             <Button variant={filterType === "CONSULTATION" ? "default" : "outline"} onClick={() => setFilterType("CONSULTATION")} size="sm" className={filterType === "CONSULTATION" ? "bg-indigo-600 hover:bg-indigo-700" : ""}>Konsultasi Medis</Button>
             <Button variant={filterType === "PHARMACY" ? "default" : "outline"} onClick={() => setFilterType("PHARMACY")} size="sm" className={filterType === "PHARMACY" ? "bg-indigo-600 hover:bg-indigo-700" : ""}>Pembelian Apotek</Button>
          </div>

          {/* Pending Orders Section */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-amber-600">
                 <CreditCard className="w-5 h-5" /> Tagihan Menunggu Pembayaran
              </CardTitle>
              <CardDescription>Segera lunasi tagihan agar rekam medis Anda tercatat penuh.</CardDescription>
            </CardHeader>
            <CardContent>
               {loading ? (
                   <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div></div>
               ) : pendingOrders.length === 0 ? (
                   <div className="text-center py-8 border border-dashed rounded-lg text-muted-foreground bg-slate-50/50">
                      <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      Tidak ada tagihan tertunda. Semua lunas!
                   </div>
               ) : (
                   <div className="space-y-4">
                      {pendingOrders.map(order => (
                        <div key={order.id} className="border border-amber-200 bg-amber-50/30 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                           <div>
                              <Badge className="bg-amber-100 text-amber-800 border-amber-200 mb-2">Awaiting Payment</Badge>
                              <h3 className="font-semibold text-lg text-slate-800">
                                {order.appointment ? "Biaya Konsultasi Dokter" : "Pembelian Obat Apotek"} #{order.id.slice(-6).toUpperCase()}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">
                                 Tanggal: {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                              {order.appointment && (
                                <div className="mt-2 text-sm text-slate-600 bg-white p-2 rounded border border-amber-100">
                                  Dokter: <span className="font-medium">{order.appointment.doctor.name}</span>
                                </div>
                              )}
                           </div>
                           <div className="w-full md:w-auto text-right flex flex-col gap-2">
                              <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-2 md:justify-end">
                                 Total Biaya
                              </p>
                              <p className="text-2xl font-bold text-slate-900">{formatCurrency(order.total)}</p>
                              <Button onClick={() => setPayOrder(order)} className="w-full bg-indigo-600 hover:bg-indigo-700">
                                 Bayar Sekarang
                              </Button>
                              {!order.appointment && (
                                <Button onClick={() => executeCancel(order.id)} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                                   Batalkan Pesanan
                                </Button>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
               )}
            </CardContent>
          </Card>

          {/* History Orders Section */}
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                 <History className="w-5 h-5 text-primary" /> Riwayat Pembayaran
              </CardTitle>
              <CardDescription>Semua tagihan yang telah diselesaikan</CardDescription>
            </CardHeader>
            <CardContent>
               {loading ? (
                  null
               ) : paidOrders.length === 0 ? (
                   <div className="text-center py-6 text-muted-foreground text-sm">
                      Belum ada riwayat pembayaran.
                   </div>
               ) : (
                   <div className="space-y-3">
                      {paidOrders.map(order => (
                        <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 gap-4">
                           <div>
                             <div className="flex items-center gap-2">
                               <h4 className="font-semibold">
                                 {order.appointment ? "Konsultasi Medis" : "Pembelian Apotek"} #{order.id.slice(-6).toUpperCase()}
                               </h4>
                               <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">LUNAS</Badge>
                             </div>
                             <p className="text-sm text-slate-500 mt-1">{new Date(order.createdAt).toLocaleDateString()} • {order.appointment?.doctor.name || "Apotek"}</p>
                           </div>
                           <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                             <p className="font-bold text-slate-800">{formatCurrency(order.total)}</p>
                             <Button size="sm" variant="outline" onClick={() => handleOpenInfoBox(order)} className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                <Eye className="w-4 h-4 mr-2" /> Detail
                             </Button>
                           </div>
                        </div>
                      ))}
                   </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Gateway Sandbox Modal */}
        <Dialog open={!!payOrder} onOpenChange={() => setPayOrder(null)}>
          <DialogContent className="sm:max-w-[400px]">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                 <CreditCard className="text-indigo-600 w-5 h-5" /> Virtual Checkout
               </DialogTitle>
               <DialogDescription>
                 Aman & Terenkripsi oleh MediCare Sandbox
               </DialogDescription>
             </DialogHeader>
             
             <div className="py-2 space-y-4">
                
                {/* ONLINE Appointment Delivery Selection */}
                {payOrder?.appointment?.mode === "ONLINE" && (
                  <div className="space-y-4 border p-4 rounded-xl bg-orange-50/50">
                    <p className="text-sm font-semibold text-orange-800 flex flex-col gap-1">
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Pengambilan Obat</span>
                      <span className="text-xs text-orange-600/80 font-normal">Karena sesi pemeriksaan Anda bersifat Online, sistem mendeteksi rekam medis / obat apotek yang perlu diambil.</span>
                    </p>
                    <div className="flex gap-2">
                       <Button variant={deliveryMode === "PICKUP" ? "default" : "outline"} onClick={() => setDeliveryMode("PICKUP")} className={`flex-1 shadow-sm ${deliveryMode === 'PICKUP' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-foreground hover:bg-slate-50'}`}>
                          Ambil di Klinik
                       </Button>
                       <Button variant={deliveryMode === "DELIVERY" ? "default" : "outline"} onClick={() => setDeliveryMode("DELIVERY")} className={`flex-1 shadow-sm ${deliveryMode === 'DELIVERY' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-foreground hover:bg-slate-50'}`}>
                          Delivery (+ Rp 15.000)
                       </Button>
                    </div>

                    {deliveryMode === "DELIVERY" && (
                       <div className="space-y-3 pt-2 text-sm mt-2">
                          <Input placeholder="Nama Lengkap Penerima" value={shippingInfo.full_name} onChange={(e) => setShippingInfo({...shippingInfo, full_name: e.target.value})} className="bg-white" />
                          <Input placeholder="Nomor Telepon Aktif" type="tel" value={shippingInfo.phone} onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})} className="bg-white" />
                          <Input placeholder="Alamat Detail Rumah Lengkap" value={shippingInfo.address} onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} className="bg-white" />
                          <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Kota" value={shippingInfo.city} onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})} className="bg-white" />
                            <Input placeholder="Kode Pos" value={shippingInfo.zipCode} onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})} className="bg-white" />
                          </div>
                       </div>
                    )}
                  </div>
                )}

               <div className="bg-slate-50 p-4 rounded-xl text-center border border-slate-100">
                 <p className="text-sm font-medium text-slate-500 mb-1">Total Validasi {payOrder?.appointment?.mode === "ONLINE" && deliveryMode === "DELIVERY" ? "(+ Ongkir Rp15.000)" : ""}</p>
                 <p className="text-3xl font-bold text-slate-900">
                    {payOrder ? formatCurrency(payOrder.total + (payOrder?.appointment?.mode === "ONLINE" && deliveryMode === "DELIVERY" ? 15000 : 0)) : 'Rp 0'}
                 </p>
               </div>
               
               <div className="space-y-2 pt-2">
                 {/* OFFLINE Appointments Cash Payment Option */}
                 {payOrder?.appointment?.mode === "ONLINE" || !payOrder?.appointment ? null : (
                   <Button onClick={executePayment} disabled={isPaying} className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-medium border border-slate-700">
                     Bayar Tunai di Kasir (Cash)
                   </Button>
                 )}

                 <Button onClick={executePayment} disabled={isPaying || (payOrder?.appointment?.mode === "ONLINE" && deliveryMode === "DELIVERY" && (!shippingInfo.full_name || !shippingInfo.phone || !shippingInfo.address))} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                   Bayar dengan GoPay
                 </Button>
                 <Button onClick={executePayment} disabled={isPaying || (payOrder?.appointment?.mode === "ONLINE" && deliveryMode === "DELIVERY" && (!shippingInfo.full_name || !shippingInfo.phone || !shippingInfo.address))} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                   BCA Virtual Account
                 </Button>
               </div>
             </div>
          </DialogContent>
        </Dialog>

        {/* INFO BOX (RECEIPT DETAILS) */}
        <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
          <DialogContent className="sm:max-w-[500px] border-none shadow-2xl p-0 overflow-hidden bg-white">
            <div className="bg-indigo-600 p-6 flex items-start justify-between text-white">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Klinik MediCare</h2>
                  <p className="text-indigo-200 text-sm opacity-90">Rincian Transaksi Tagihan Medis</p>
               </div>
               <Receipt className="w-10 h-10 opacity-30 absolute right-4 top-4" />
            </div>
             
            {viewOrder && (
              <div className="p-6">
                <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
                   <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">No. Referensi Pembayaran</p>
                      <p className="font-bold text-gray-800">#{viewOrder.id.slice(-8).toUpperCase()}</p>
                   </div>
                   <div className="text-right space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Waktu Terbit</p>
                      <p className="text-sm font-semibold text-gray-800">{new Date(viewOrder.createdAt).toLocaleDateString('id-ID')}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-gray-400 mb-1 uppercase">Dokter</p>
                      <p className="text-sm font-bold text-indigo-700">{viewOrder.appointment?.doctor.name || "-"}</p>
                   </div>
                   <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-right">
                      <p className="text-xs font-bold text-emerald-600/60 mb-1 uppercase">Status</p>
                      <p className="text-sm font-black text-emerald-600 tracking-wider">LUNAS SUKSES</p>
                   </div>
                </div>

                <div className="space-y-3 mb-6">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detail Rincian</p>
                   
                   {/* Jika dari appointment dokter */}
                   {viewOrder.appointment && (
                     <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-2">
                        <p className="text-gray-600 font-medium">Jasa Konsultasi Medis</p>
                        <p className="font-semibold text-gray-800">Rp 150.000</p>
                     </div>
                   )}

                   {/* Rincian item obat berdasarkan orderItems dari API */}
                   {viewOrder.orderItems && viewOrder.orderItems.length > 0 ? (
                     viewOrder.orderItems.map((item) => (
                       <div key={item.id} className="flex justify-between text-sm items-center border-b border-gray-50 pb-2">
                          <div className="space-y-1">
                            <p className="text-gray-600 font-medium">{item.item_name}</p>
                            <p className="text-xs text-gray-400">{item.quantity} rincian x {formatCurrency(item.unit_price)}</p>
                          </div>
                          <p className="font-semibold text-gray-800">{formatCurrency(item.unit_price * item.quantity)}</p>
                       </div>
                     ))
                   ) : (
                     <div className="flex justify-between text-sm items-center border-b border-gray-50 pb-2">
                        <div className="space-y-1">
                          <p className="text-gray-600 font-medium">Obat & Layanan Apotek</p>
                        </div>
                        <p className="font-semibold text-gray-800">{formatCurrency(viewOrder.appointment ? viewOrder.subtotal - 150000 : viewOrder.subtotal)}</p>
                     </div>
                   )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
                   <div className="flex justify-between text-sm text-gray-500 font-semibold mb-1">
                      <p>Subtotal Tagihan</p>
                      <p>{formatCurrency(viewOrder.subtotal)}</p>
                   </div>
                   <div className="flex justify-between text-sm text-gray-500 font-semibold mb-3">
                      <p>Pajak Tambahan (PPN 11%)</p>
                      <p>{formatCurrency(viewOrder.tax)}</p>
                   </div>
                   <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <p className="font-bold text-gray-800">TOTAL DIBAYAR</p>
                      <p className="text-xl font-black text-indigo-700">{formatCurrency(viewOrder.total)}</p>
                   </div>
                </div>
                
                <div className="mt-6">
                   <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50" onClick={() => setViewOrder(null)}>
                     Tutup Informasi Transaksi
                   </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </>
  );
}
