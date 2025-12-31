"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Plus, Trash2, Edit2, RefreshCw } from "lucide-react";
import { stockData } from "@/lib/store-data";

interface InventoryItem {
  id: string;
  item_name: string;
  description: string;
  category: string;
  quantity: number;
  reorder_level: number;
  unit_price: number;
  supplier?: string;
  is_active: boolean;
}

export function InventoryView() {
  const transformedStockData: InventoryItem[] = stockData.map((item: any) => ({
    id: String(item.id),
    item_name: item.name,
    description: item.description ?? "",
    category: item.category,
    quantity: item.quantity ?? 0,
    reorder_level: 10,
    unit_price: item.price ?? 0,
    supplier: item.supplier ?? "Default",
    is_active: true,
  }));

  const [inventory, setInventory] =
    useState<InventoryItem[]>(transformedStockData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<InventoryItem>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imgBust, setImgBust] = useState<Record<string, number>>({});
  const [addImage, setAddImage] = useState<File | null>(null);
  const [addPreview, setAddPreview] = useState<string>("");

  const syncWithStoreData = async () => {
    try {
      setIsRefreshing(true);

      const response = await fetch("/api/admin/inventory");
      if (!response.ok) return;

      const data = await response.json();

      const updatedInventory = inventory.map((item) => {
        const storeItem = data.find(
          (s: any) =>
            s.item_name?.toLowerCase() === item.item_name.toLowerCase()
        );

        if (!storeItem) return item;

        return {
          ...item,
          quantity: storeItem.quantity ?? item.quantity,
        };
      });

      setInventory(updatedInventory);
    } catch (error) {
      console.error("[inventory] sync error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const lowStockItems = inventory.filter(
    (item) => item.quantity <= item.reorder_level
  );

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditValues({ ...item });
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editValues.item_name || !editValues.category) {
      console.log("[v0] Validation failed - missing required fields");
      return;
    }

    try {
      const payload = {
        id,
        item_name: editValues.item_name,
        description: editValues.description ?? "",
        category: editValues.category,
        quantity: editValues.quantity,
        reorder_level: editValues.reorder_level,
        unit_price: editValues.unit_price,
        supplier: editValues.supplier,
        is_active: editValues.is_active,
      };

      const putRes = await fetch("/api/admin/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => null);
        throw new Error(err?.message || "Failed to update inventory");
      }

      if (selectedImage) {
        await uploadProductImage(editValues.item_name, selectedImage);
        setSelectedImage(null);
        setImagePreview("");
        setImgBust((prev) => ({ ...prev, [id]: Date.now() }));
      }

      const updatedInventory: InventoryItem[] = inventory.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          item_name: editValues.item_name ?? item.item_name,
          description: editValues.description ?? item.description,
          category: editValues.category ?? item.category,
          quantity: editValues.quantity ?? item.quantity,
          reorder_level: editValues.reorder_level ?? item.reorder_level,
          unit_price: editValues.unit_price ?? item.unit_price,
          supplier: editValues.supplier ?? item.supplier,
          is_active: editValues.is_active ?? item.is_active,
          _imgBust: Date.now(),
        } as any;
      });

      setInventory(updatedInventory);
      setEditingId(null);
      setEditValues({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/admin/inventory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to delete item:", res.status, errText);
      return;
    }

    await fetchInventory();
  };

  const handleAddItem = async () => {
    if (
      !newItem.item_name ||
      !newItem.category ||
      newItem.quantity === undefined ||
      newItem.unit_price === undefined
    ) {
      return;
    }

    try {
      const payload = {
        item_name: newItem.item_name,
        description: newItem.description ?? "",
        category: newItem.category,
        quantity: newItem.quantity,
        reorder_level: newItem.reorder_level ?? 10,
        unit_price: newItem.unit_price,
        supplier: newItem.supplier,
        is_active: true,
      };

      // 1) Create product (JSON)
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error("Failed to add item:", err);
        return;
      }

      const createdItem: InventoryItem = await res.json();

      // 2) Upload image kalau user pilih (FormData)
      if (addImage) {
        await uploadProductImage(createdItem.item_name, addImage);

        // cache-bust biar gambar langsung kebaca
        setImgBust((prev) => ({ ...prev, [createdItem.id]: Date.now() }));
      }

      // 3) Update UI
      setInventory((prev) => [...prev, createdItem]);
      setNewItem({});
      setShowAddForm(false);

      // 4) Reset add image state (biar ga nyangkut ke row lain)
      setAddImage(null);
      setAddPreview("");
    } catch (e) {
      console.error(e);
    }
  };

  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      MEDICAL_DEVICE: "Medical Device",
      SUPPLEMENT: "Supplement",
      PRESCRIPTION: "Prescription",
      MEDICAL_SUPPLY: "Medical Supply",
    };

    return map[cat] ?? cat;
  };

  const getProductImage = (itemName: string) => {
    if (!itemName) return "/store/default.png";

    const safeName = itemName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    return `/store/${safeName}.png`;
  };

  const uploadProductImage = async (itemName: string, file: File) => {
    const fd = new FormData();
    fd.append("item_name", itemName);
    fd.append("image", file);

    const res = await fetch("/api/admin/inventory/upload-image", {
      method: "POST",
      credentials: "include",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Upload image failed");
    }

    return (await res.json()) as { imagePath: string };
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({});

  const fetchInventory = async () => {
    try {
      setIsRefreshing(true);

      const res = await fetch("/api/admin/inventory");
      if (!res.ok) return;

      const data: InventoryItem[] = await res.json();
      setInventory(data);
    } catch (err) {
      console.error("[inventory] fetch error:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <div className="space-y-6">
      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="flex flex-row items-center gap-2 pb-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-900">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-800">
              {lowStockItems.length} item(s) below reorder level:{" "}
              {lowStockItems.map((i) => i.item_name).join(", ")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp.
              {inventory
                .reduce(
                  (sum, item) => sum + item.quantity * (item.unit_price || 0),
                  0
                )
                .toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {lowStockItems.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item Form */}
      {showAddForm && (
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Item Name"
                value={newItem.item_name || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, item_name: e.target.value })
                }
              />
              <select
                className="border rounded-md px-3 py-2 text-sm"
                value={newItem.category || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="MEDICAL_DEVICE">Medical Device</option>
                <option value="SUPPLEMENT">Supplement</option>
                <option value="PRESCRIPTION">Prescription</option>
                <option value="MEDICAL_SUPPLY">Medical Supply</option>
              </select>

              <Input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity || ""}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: Number.parseInt(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Unit Price"
                value={newItem.unit_price || ""}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    unit_price: Number.parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                placeholder="Supplier"
                value={newItem.supplier || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, supplier: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Reorder Level"
                value={newItem.reorder_level || ""}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    reorder_level: Number.parseInt(e.target.value),
                  })
                }
              />
              <Input
                placeholder="Description"
                value={newItem.description || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setAddImage(file);
                  setAddPreview(file ? URL.createObjectURL(file) : "");
                }}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleAddItem}
                className="bg-primary hover:bg-primary/90"
              >
                Add Item
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!showAddForm && (
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>

          <Button
            onClick={fetchInventory}
            variant="outline"
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      )}

      {/* Inventory Table */}
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <p className="text-xs text-muted-foreground mt-2">
            Real-time stock tracking: Items automatically decrease when
            customers place orders
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 font-medium">Item Name</th>
                  <th className="text-left py-2 px-4 font-medium">Category</th>
                  <th className="text-left py-2 px-4 font-medium">Quantity</th>
                  <th className="text-left py-2 px-4 font-medium">
                    Reorder Level
                  </th>
                  <th className="text-left py-2 px-4 font-medium">
                    Unit Price
                  </th>
                  <th className="text-left py-2 px-4 font-medium">Supplier</th>
                  <th className="text-left py-2 px-4 font-medium">
                    Description
                  </th>
                  <th className="text-left py-2 px-4 font-medium">Image</th>
                  <th className="text-left py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b border-border/50 hover:bg-muted/50 ${
                      item.quantity <= item.reorder_level ? "bg-yellow-50" : ""
                    }`}
                  >
                    {editingId === item.id ? (
                      <>
                        <td className="py-3 px-4">
                          <Input
                            value={editValues.item_name || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                item_name: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            className="h-8 w-full border rounded-md px-2 text-sm"
                            value={editValues.category || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                category: e.target.value,
                              })
                            }
                          >
                            <option value="MEDICAL_DEVICE">
                              Medical Device
                            </option>
                            <option value="SUPPLEMENT">Supplement</option>
                            <option value="PRESCRIPTION">Prescription</option>
                            <option value="MEDICAL_SUPPLY">
                              Medical Supply
                            </option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={editValues.quantity || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                quantity: Number.parseInt(e.target.value) || 0,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={editValues.reorder_level || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                reorder_level:
                                  Number.parseInt(e.target.value) || 0,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="number"
                            value={editValues.unit_price || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                unit_price:
                                  Number.parseFloat(e.target.value) || 0,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            value={editValues.supplier || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                supplier: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            value={editValues.description || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                description: e.target.value,
                              })
                            }
                            className="h-8"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                imagePreview ||
                                `${getProductImage(
                                  editValues.item_name || item.item_name
                                )}?v=${imgBust[item.id] ?? 0}`
                              }
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.dataset.fallbackApplied) return;
                                img.dataset.fallbackApplied = "1";
                                img.src = "/store/default.png";
                              }}
                              className="h-10 w-10 rounded object-cover border"
                            />

                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setSelectedImage(file);
                                setImagePreview(
                                  file ? URL.createObjectURL(file) : ""
                                );
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 bg-transparent"
                            onClick={() => handleSaveEdit(item.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setEditValues({});
                              setSelectedImage(null);
                              setImagePreview("");
                            }}
                          >
                            Cancel
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4">{item.item_name}</td>
                        <td className="py-3 px-4">
                          {formatCategory(item.category)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={
                              item.quantity <= item.reorder_level
                                ? "font-bold text-yellow-600"
                                : ""
                            }
                          >
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4">{item.reorder_level}</td>
                        <td className="py-3 px-4">
                          Rp. {(item.unit_price || 0).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">{item.supplier ?? "-"}</td>
                        <td
                          className="py-3 px-4 max-w-[260px] truncate"
                          title={item.description}
                        >
                          {item.description || "-"}
                        </td>
                        <td className="py-3 px-4">
                          <img
                            src={`${getProductImage(item.item_name)}?v=${
                              imgBust[item.id] ?? 0
                            }`}
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.dataset.fallbackApplied) return;
                              img.dataset.fallbackApplied = "1";
                              img.src = "/store/default.png";
                            }}
                            className="h-10 w-10 rounded object-cover border"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 bg-transparent"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive bg-transparent"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
