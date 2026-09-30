import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MenuItem,
  MENU_ITEMS_PER_PAGE,
  cardShell,
  primaryAction,
  positiveAction,
  subtleAction,
} from "./types";

export const MenuManager = () => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [menuSearchTerm, setMenuSearchTerm] = useState("");
  const [menuPage, setMenuPage] = useState(1);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Main Course",
    description: "",
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("category", { ascending: true });

    if (data) setMenuItems(data);
    setLoading(false);
  };

  const filteredMenuItems = useMemo(() => {
    const query = menuSearchTerm.trim().toLowerCase();
    if (!query) return menuItems;

    return menuItems.filter((item) => {
      const name = item.name.toLowerCase();
      const category = item.category.toLowerCase();
      return name.includes(query) || category.includes(query);
    });
  }, [menuItems, menuSearchTerm]);

  const totalMenuPages = useMemo(
    () => Math.max(1, Math.ceil(filteredMenuItems.length / MENU_ITEMS_PER_PAGE)),
    [filteredMenuItems.length]
  );

  const paginatedMenuItems = useMemo(() => {
    const from = (menuPage - 1) * MENU_ITEMS_PER_PAGE;
    const to = from + MENU_ITEMS_PER_PAGE;
    return filteredMenuItems.slice(from, to);
  }, [filteredMenuItems, menuPage]);

  useEffect(() => {
    setMenuPage(1);
  }, [menuSearchTerm]);

  useEffect(() => {
    if (menuPage > totalMenuPages) {
      setMenuPage(totalMenuPages);
    }
  }, [menuPage, totalMenuPages]);

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    if (editingId) {
      const { error } = await supabase
        .from("menu_items")
        .update({
          name: newItem.name,
          price: parseInt(newItem.price),
          category: newItem.category,
          description: newItem.description,
        })
        .eq("id", editingId);

      if (!error) {
        toast.success("Item updated! ✨");
        setMenuItems((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? { ...item, ...newItem, price: parseInt(newItem.price) }
              : item
          )
        );
        resetForm();
      }
    } else {
      const { error } = await supabase.from("menu_items").insert([
        { ...newItem, price: parseInt(newItem.price), is_available: true },
      ]);

      if (!error) {
        toast.success("Item added! 🍲");
        fetchMenuItems();
        resetForm();
      }
    }
  };

  const deleteMenuItem = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (!error) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item deleted");
    }
  };

  const startEditing = (item: MenuItem) => {
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description,
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setNewItem({ name: "", price: "", category: "Main Course", description: "" });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold/70" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Add / Edit Item Form */}
      <div
        className={`bg-card/95 p-6 rounded-2xl border border-gold/15 shadow-soft h-fit order-2 md:order-1`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-charcoal">
            {editingId ? "Edit Item" : "Add New Item"}
          </h3>
          {editingId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="text-xs h-6 text-muted-foreground hover:text-charcoal"
            >
              Cancel
            </Button>
          )}
        </div>
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div>
            <Label>Item Name</Label>
            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g. Beef Burger"
            />
          </div>
          <div>
            <Label>Price (KES)</Label>
            <Input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              placeholder="800"
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              <option>Main Course</option>
              <option>Soft Drinks</option>
              <option>Beverages</option>
              <option>Dessert</option>
              <option>Snack</option>
              <option>Breakfast</option>
            </select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              placeholder="e.g. Served with fries"
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            className={`w-full ${editingId ? positiveAction : primaryAction}`}
          >
            {editingId ? (
              <>
                <Pencil className="mr-2 h-4 w-4" /> Update Item
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Menu Items List */}
      <div className="md:col-span-2 space-y-4 order-1 md:order-2">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search item or category..."
            className="pl-10 bg-white/90 w-full border-gold/25 focus-visible:ring-gold"
            value={menuSearchTerm}
            onChange={(e) => setMenuSearchTerm(e.target.value)}
          />
        </div>

        {/* Mobile List View */}
        <div className="md:hidden space-y-3">
          {paginatedMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-card/95 p-4 rounded-xl border border-gold/15 shadow-soft flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-charcoal">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.category}</div>
                <div className="font-medium text-forest mt-1">KES {item.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gold-dark bg-gold/15 hover:bg-gold/25"
                  onClick={() => startEditing(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-500 bg-red-100/70 hover:bg-red-200/80"
                  onClick={() => deleteMenuItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {paginatedMenuItems.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No menu items found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className={`hidden md:block overflow-hidden ${cardShell}`}>
          <table className="w-full text-sm text-left">
            <thead className="bg-cream-dark/70 text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {paginatedMenuItems.map((item) => (
                <tr key={item.id} className="hover:bg-cream/60">
                  <td className="px-6 py-4">
                    <div className="font-medium text-charcoal">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-forest">KES {item.price}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gold-dark hover:bg-gold/15"
                      onClick={() => startEditing(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:bg-red-100/70"
                      onClick={() => deleteMenuItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {paginatedMenuItems.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-muted-foreground">
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            Page {menuPage} of {Math.max(1, totalMenuPages)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={subtleAction}
              size="sm"
              onClick={() => setMenuPage((prev) => Math.max(1, prev - 1))}
              disabled={menuPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className={subtleAction}
              size="sm"
              onClick={() => setMenuPage((prev) => Math.min(totalMenuPages, prev + 1))}
              disabled={menuPage >= totalMenuPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
