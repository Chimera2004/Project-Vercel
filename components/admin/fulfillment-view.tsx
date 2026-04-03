"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, CheckCircle2, AlertCircle, ShoppingBag, MapPin } from "lucide-react";
import Swal from "sweetalert2";

type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  user: { name: string; phoneNumber: string; email: string };
  shippingAddress: { full_name: string; phone: string; address: string; city: string; zipCode: string; } | null;
  appointment?: { mode: string; } | null;
  orderItems: { id: string; item_name: string; quantity: number }[];
};

export function FulfillmentView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"PAID" | "SHIPPED" | "COMPLETED">("PAID");

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  const fetchOrders = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${status}`);
      if (res.ok) setOrders(await res.json());
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    // Show confirmation
    const result = await Swal.fire({
      title: 'Update Status?',
      text: `Ubah pesanan menjadi ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Ubah!',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      if (res.ok) {
        fetchOrders(activeTab);
        Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Status Diperbarui' });
      }
    } catch(e) {
      Swal.fire('Error', 'Gagal memperbarui status', 'error');
    }
  }

  const formatCurrency = (amt: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amt);

  return (
    <div className="space-y-6">
      
      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeTab === "PAID" ? "default" : "outline"} 
          onClick={() => setActiveTab("PAID")}
          className="flex items-center gap-2"
        >
          <Package className="w-4 h-4" /> Siap Diproses (Perlu Dikirim/Diambil)
        </Button>
        <Button 
          variant={activeTab === "SHIPPED" ? "default" : "outline"} 
          onClick={() => setActiveTab("SHIPPED")}
          className="flex items-center gap-2"
        >
          <Truck className="w-4 h-4" /> Dalam Pengiriman (Shipped)
        </Button>
        <Button 
          variant={activeTab === "COMPLETED" ? "default" : "outline"} 
          onClick={() => setActiveTab("COMPLETED")}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Selesai (Completed)
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b pb-4">
          <CardTitle className="text-xl flex items-center gap-2 text-indigo-700">
             Logistik & Ekspedisi Obat
          </CardTitle>
          <CardDescription>
             Kelola pengiriman obat dari pesanan Toko (Store) maupun resep Pasien Online (Telemedisin).
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {loading ? (
             <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
          ) : orders.length === 0 ? (
             <div className="text-center p-12 text-muted-foreground border border-dashed rounded-lg bg-slate-50/30">
               <AlertCircle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
               Tidak ada pesanan di kategori ini.
             </div>
          ) : (
             <div className="space-y-4">
                {orders.map(order => {
                  const isStore = !order.appointment;
                  const isDelivery = !!order.shippingAddress;
                  const isPickup = !isStore && !isDelivery; // Online appointment picked up

                  return (
                    <div key={order.id} className="flex flex-col md:flex-row justify-between items-start md:items-stretch p-5 border rounded-xl hover:shadow-md transition-shadow gap-6 bg-white">
                       <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                             <Badge variant="outline" className={`flex items-center gap-1 ${isStore ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                               {isStore ? <ShoppingBag className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                               {isStore ? "Pesanan E-Commerce" : "Resep Pasien Online"}
                             </Badge>
                             <Badge className={isDelivery ? "bg-orange-100 hover:bg-orange-200 text-orange-800" : "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"}>
                               {isDelivery ? "Delivery (Dikirim)" : "Ambil di Klinik (Pick Up)"}
                             </Badge>
                          </div>
                          
                          <div>
                            <h3 className="font-bold text-lg text-slate-800">{order.shippingAddress?.full_name || order.user.name}</h3>
                            <p className="text-sm text-slate-500">{order.shippingAddress?.phone || order.user.phoneNumber}</p>
                          </div>

                          {isDelivery && order.shippingAddress && (
                            <div className="bg-slate-50 p-3 rounded border border-slate-100 text-sm mt-2">
                               <p className="font-semibold text-slate-700 mb-1">Alamat Pengiriman:</p>
                               <p className="text-slate-600">{order.shippingAddress.address}</p>
                               <p className="text-slate-600">{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                            </div>
                          )}

                          <div className="pt-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Item yang Harus Disiapkan</p>
                            <ul className="text-sm text-slate-700 space-y-1 bg-amber-50/50 p-2 rounded border border-amber-100/50">
                              {order.orderItems.length > 0 ? order.orderItems.map((item, idx) => (
                                <li key={idx} className="flex justify-between border-b border-amber-100 last:border-0 pb-1 last:pb-0">
                                  <span>{item.item_name}</span>
                                  <span className="font-bold">x{item.quantity}</span>
                                </li>
                              )) : (
                                <li className="italic text-slate-400">- Hanya resep manual (Lihat detail CM) -</li>
                              )}
                            </ul>
                          </div>
                       </div>

                       <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 w-full md:w-64">
                          <div className="text-right w-full">
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Order ID</p>
                            <p className="font-mono text-sm text-slate-800">#{order.id.slice(-8).toUpperCase()}</p>
                            
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-3 mb-1">Total Dibayar</p>
                            <p className="text-xl font-bold text-indigo-700">{formatCurrency(order.total)}</p>
                          </div>

                          <div className="w-full mt-4 space-y-2">
                            {activeTab === "PAID" && isDelivery && (
                              <Button onClick={() => updateStatus(order.id, "SHIPPED")} className="w-full bg-blue-600 hover:bg-blue-700 shadow-sm text-sm h-11">
                                <Truck className="w-4 h-4 mr-2" /> Tandai Dikirim (Shipped)
                              </Button>
                            )}
                            {activeTab === "PAID" && isPickup && (
                              <Button onClick={() => updateStatus(order.id, "COMPLETED")} className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm text-sm h-11">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Tandai Selesai Diambil
                              </Button>
                            )}
                            {activeTab === "SHIPPED" && (
                              <Button onClick={() => updateStatus(order.id, "COMPLETED")} className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-sm text-sm h-11">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Tandai Paket Diterima
                              </Button>
                            )}
                            {activeTab === "COMPLETED" && (
                              <Button variant="outline" className="w-full bg-slate-100 text-slate-500 border-slate-200" disabled>
                                Sudah Diselesaikan
                              </Button>
                            )}
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
