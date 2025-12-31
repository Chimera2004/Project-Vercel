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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  Shield,
  X,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { stockData } from "@/lib/store-data";
import { useRef } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export default function StorePage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [inventory, setInventory] = useState(stockData);
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        setIsLoadingInventory(true);
        const response = await fetch("/api/inventory", { cache: "no-store" });

        if (response.ok) {
          const data = await response.json();
          console.log("[v0] Inventory loaded:", data);

          if (Array.isArray(data)) setInventory(data);
          else setInventory(stockData);
        } else {
          setInventory(stockData);
        }
      } catch (error) {
        console.error("[v0] Error loading inventory:", error);
        setInventory(stockData);
      } finally {
        setIsLoadingInventory(false);
        isFetchingRef.current = false;
      }
    };

    fetchInventory();
    const pollInterval = setInterval(fetchInventory, 30000);
    return () => clearInterval(pollInterval);
  }, []);

  const addToCart = (productId: string) => {
    console.log("[v0] Adding to cart:", productId);
    setCart((prev) => {
      const newCart = {
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      };
      console.log("[v0] New cart state:", newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    console.log("[v0] Removing from cart:", productId);
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      console.log("[v0] New cart state after removal:", newCart);
      return newCart;
    });
  };

  const getTotalItems = () =>
    Object.values(cart).reduce((sum, count) => sum + count, 0);

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = inventory.find((p) => p.id === productId);
      return sum + (product ? product.price * count : 0);
    }, 0);
  };

  const toggleCart = () => {
    console.log("[v0] Toggling cart. Current cart:", cart);
    console.log("[v0] Cart items count:", getTotalItems());
    setShowCart(!showCart);
  };

  const handleCheckout = () => {
    const outOfStockItems = Object.entries(cart).filter(
      ([productId, count]) => {
        const product = inventory.find((p) => p.id === productId);
        return !product || product.quantity < count;
      }
    );

    if (outOfStockItems.length > 0) {
      const outOfStockNames = outOfStockItems
        .map(([productId]) => inventory.find((p) => p.id === productId)?.name)
        .filter(Boolean)
        .join(", ");

      alert(
        `The following items don’t have enough stock and cannot be ordered: ${
          outOfStockNames || "Unknown items"
        }`
      );
      return;
    }

    const cartData = Object.entries(cart).map(([productId, quantity]) => {
      const product = inventory.find((p) => p.id === productId);
      return {
        id: productId,
        name: product?.name || "Unknown",
        price: product?.price || 0,
        quantity,
        image: product?.image || "/placeholder.svg",
      };
    });

    localStorage.setItem("pendingCart", JSON.stringify(cartData));
    setShowCart(false);
    router.push("/checkout");
  };

  const handleManualRefresh = async () => {
    try {
      setIsLoadingInventory(true);
      const response = await fetch("/api/inventory");
      if (response.ok) {
        const data = await response.json();
        console.log("[v0] Inventory refreshed manually:", data);

        if (Array.isArray(data)) setInventory(data);
        else setInventory(stockData);
      } else {
        setInventory(stockData);
      }
    } catch (error) {
      console.error("[v0] Error refreshing inventory:", error);
    } finally {
      setIsLoadingInventory(false);
    }
  };

  const categories = [
    { id: "all", name: "All Products" },
    { id: "medical-devices", name: "Medical Devices" },
    { id: "supplements", name: "Supplements" },
    { id: "prescription", name: "Prescription" },
    { id: "medical-supplies", name: "Medical Supplies" },
  ];

  const filteredProducts = inventory.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                  onClick={() => router.push(isAdmin ? "/admin" : "/booking")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to {isAdmin ? "Admin" : "Dashboard"}
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                    <Heart className="h-4 w-4 text-primary" />
                    <Shield className="h-3 w-3 text-primary -ml-2" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                      Medical Store
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Quality healthcare products and medicines
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManualRefresh}
                  disabled={isLoadingInventory}
                  title="Refresh inventory"
                  className="gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      isLoadingInventory ? "animate-spin" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative bg-transparent"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    Rp. {getTotalPrice().toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Cart Dropdown */}
        {showCart && (
          <div className="fixed top-20 right-4 w-80 bg-card border rounded-lg shadow-xl z-[99999]">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Shopping Cart</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {getTotalItems() === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(cart).map(([productId, count]) => {
                    const product = inventory.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div
                        key={productId}
                        className="flex items-center gap-3 p-2 bg-muted/20 rounded"
                      >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Rp. {product.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-6 text-center">
                            {count}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center font-semibold mb-3">
                      <span>Total: Rp. {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="aspect-square relative bg-muted/20">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.quantity <= 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-red-600 text-white font-bold text-2xl px-6 py-3 rounded-lg transform rotate-12">
                      OUT OF STOCK
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  {product.quantity <= 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Out of Stock
                    </Badge>
                  )}
                  {product.quantity > 0 && product.quantity < 20 && (
                    <Badge variant="outline" className="text-xs bg-yellow-50">
                      Only {product.quantity} left
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      Rp. {product.price}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {categories.find((c) => c.id === product.category)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {cart[product.id] > 0 && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {cart[product.id]}
                        </span>
                      </>
                    )}
                    <Button
                      size="sm"
                      onClick={() => addToCart(product.id)}
                      disabled={product.quantity <= 0}
                      className="h-8 w-8 p-0"
                      title={
                        product.quantity <= 0
                          ? "This item is out of stock"
                          : "Add to cart"
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                No products found matching your search criteria.
              </p>
            </CardContent>
          </Card>
        )}

        {/* HIPAA Compliance Notice */}
        <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>
                All transactions are HIPAA compliant and your medical
                information is protected.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
