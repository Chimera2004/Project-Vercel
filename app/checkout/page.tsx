"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Heart,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Swal from "sweetalert2";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

type OrderItemInput = {
  id: string;
  quantity: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const pendingCart = localStorage.getItem("pendingCart");
    if (pendingCart) {
      try {
        const cart = JSON.parse(pendingCart);
        console.log("[v0] Loaded cart from localStorage:", cart);
        setCartItems(cart);
        // Do NOT remove until order is placed successfully
      } catch (error) {
        console.error("[v0] Error loading cart:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Autofill from profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const profile = await res.json();
          setShippingInfo({
            name: profile.name || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            zip: profile.zipCode || "",
            phone: profile.phoneNumber || "",
            email: profile.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile for autofill:", error);
      }
    };
    fetchProfile();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
      console.log("[v0] Processing order with items:", cartItems);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          shipping: {
            full_name: shippingInfo.name,
            phone: shippingInfo.phone,
            email: shippingInfo.email,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zipCode: shippingInfo.zip,
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("[v0] Order placed successfully:", data);
        setOrderId(data.orderId);

        setOrderComplete(true);

        localStorage.removeItem("pendingCart");

        Swal.fire({
          icon: 'success',
          title: 'Pesanan Dibuat!',
          text: 'Harap selesaikan pembayaran Anda di menu Billing.'
        });
      } else {
        console.error("[v0] Order placement failed:", data);
        Swal.fire({
          icon: 'error',
          title: 'Pembelian Gagal',
          text: data?.message || "Failed to place order. Please try again."
        });
      }
    } catch (error) {
      console.error("[v0] Error during checkout:", error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: "An error occurred during checkout. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm text-center">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-600">
                Pesanan Berhasil Dibuat!
              </CardTitle>
              <CardDescription>
                Terima kasih atas pembelian Anda. Nomor pesanan Anda adalah <span className="font-semibold text-foreground">#INV-{orderId ? orderId.slice(-8).toUpperCase() : "-"}</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Pesanan obat/alat medis Anda telah tercatat di sistem. Silakan lanjutkan ke menu **Billing & Tagihan** untuk menyelesaikan pembayaran.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => router.push("/store")} variant="outline">
                  Lanjut Belanja Obat
                </Button>
                <Button onClick={() => router.push("/billing")}>
                  Buka Menu Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/store")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Toko
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Heart className="h-4 w-4 text-primary" />
                    <Shield className="h-3 w-3 text-primary -ml-2" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                      Pembayaran (Checkout)
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Lengkapi data pengiriman untuk pesanan Anda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informasi Pengiriman
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Penerima</Label>
                  <Input id="name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Input id="address" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota / Kabupaten</Label>
                    <Input id="city" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Provinsi</Label>
                    <Input id="state" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Kode Pos</Label>
                    <Input id="zip" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor HP / Telepon</Label>
                    <Input id="phone" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Alamat Email</Label>
                    <Input id="email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Jumlah: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal Produk</span>
                        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya Pengiriman</span>
                        <span>Rp {shipping.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pajak (PPN)</span>
                        <span>Rp {tax.toLocaleString("id-ID")}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total Pembayaran</span>
                        <span>Rp {total.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing || !Object.values(shippingInfo).every(val => val.trim() !== "")}
                    >
                      {isProcessing ? "Memproses..." : "Buat Pesanan"}
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Tidak ada produk di keranjang
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>
                    Pembayaran aman dengan enkripsi SSL 256-bit dan kerahasiaan data medis terlindungi.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
