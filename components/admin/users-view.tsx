"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  last_login: string | null;
}

export function UsersView() {
  const [users, setUsers] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Doctor | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Doctor>>({});
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddAdminDialog, setShowAddAdminDialog] = useState(false);
  const [newAdminData, setNewAdminData] = useState<{
    name: string;
    email: string;
    phone: string;
  }>({
    name: "",
    email: "",
    phone: "",
  });
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/doctors", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user: Doctor) => {
    setEditingUser(user);
    setEditFormData(user);
    setShowEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch("/api/admin/doctors", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          name: editFormData.name,
          email: editFormData.email,
          phone: editFormData.phone,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

      setShowEditDialog(false);
      setEditingUser(null);
      setEditFormData({});
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Profil Dokter diubah!' });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: "Gagal mengupdate profil dokter." });
    }
  };

  const handleDeactivate = async (user: Doctor) => {
    try {
      const response = await fetch("/api/admin/doctors", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          isActive: !user.isActive,
        }),
      });

      if (!response.ok) throw new Error("Failed to update user status");

      const updatedUser = await response.json();

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminData.name || !newAdminData.email || !newAdminData.phone) {
      Swal.fire({ icon: 'warning', title: 'Data Belum Lengkap', text: 'Tolong lengkapi semua bidang.' });
      return;
    }

    try {
      setAddingAdmin(true);
      const response = await fetch("/api/admin/doctors", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdminData),
      });

      if (!response.ok) throw new Error("Failed to create new admin");

      const newAdmin = await response.json();
      setUsers([...users, newAdmin]);
      setShowAddAdminDialog(false);

      setNewAdminData({
        name: "",
        email: "",
        phone: "",
      });

      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Dokter berhasil ditambahkan!' });
    } catch (error) {
      console.error("Error adding new doctor:", error);
      Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menambahkan dokter baru. Silakan coba lagi." });
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleDelete = async (user: Doctor) => {
    const result = await Swal.fire({
      title: 'Hapus Dokter?',
      text: `Anda yakin ingin menghapus data dokter ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!'
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/admin/doctors?id=${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      // Hapus user dari state supaya tabel update
      setUsers(users.filter((u) => u.id !== user.id));
      Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, icon: 'success', title: 'Dokter dihapus!' });
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menghapus dokter. Silakan coba lagi." });
    }
  };

  return (
    <>
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Dokter ({users.length} dokter)</CardTitle>
          <Button onClick={() => setShowAddAdminDialog(true)} className="gap-2">
            + Dokter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 font-medium">Name</th>
                  <th className="text-left py-2 px-4 font-medium">Email</th>
                  <th className="text-left py-2 px-4 font-medium">Phone</th>
                  <th className="text-left py-2 px-4 font-medium">Status</th>
                  <th className="text-left py-2 px-4 font-medium">Joined</th>
                  <th className="text-left py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 bg-transparent"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`bg-transparent ${
                          user.isActive ? "text-destructive" : "text-green-600"
                        }`}
                        onClick={() => handleDeactivate(user)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent text-red-600 ml-2"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No users found
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dokter</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={editFormData.name || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={editFormData.email || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={editFormData.phone || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddAdminDialog} onOpenChange={setShowAddAdminDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Dokter Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Enter full name"
                value={newAdminData.name}
                onChange={(e) =>
                  setNewAdminData({
                    ...newAdminData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter email"
                value={newAdminData.email}
                onChange={(e) =>
                  setNewAdminData({
                    ...newAdminData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                placeholder="Enter phone number"
                value={newAdminData.phone}
                onChange={(e) =>
                  setNewAdminData({
                    ...newAdminData,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddAdminDialog(false)}
              disabled={addingAdmin}
            >
              Cancel
            </Button>
            <Button onClick={handleAddAdmin} disabled={addingAdmin}>
              {addingAdmin ? "Sedang menambahkan..." : "Tambah Dokter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
