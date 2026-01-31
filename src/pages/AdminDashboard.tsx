import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea
import { Loader2, LogOut, Plus, Trash2, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// --- TYPES ---
interface Booking {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  date: string;
  guests: number;
  message: string;
  status: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string; // Added this
  is_available: boolean;
}

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Updated Form State with description
  const [newItem, setNewItem] = useState({ 
    name: "", 
    price: "", 
    category: "Main Course", 
    description: "" 
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "bookings") {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (data) setBookings(data);
    } else {
      const { data } = await supabase.from('menu_items').select('*').order('category', { ascending: true });
      if (data) setMenuItems(data);
    }
    setLoading(false);
  };

  const updateBookingStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (!error) {
      toast.success(`Booking ${newStatus}`);
      fetchData();
    } else {
      toast.error("Failed to update status");
    }
  };

  const addMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    // Matches your DB columns: name, price, category, description, is_available
    const { error } = await supabase.from('menu_items').insert([
      { 
        name: newItem.name, 
        price: parseInt(newItem.price), 
        category: newItem.category, 
        description: newItem.description,
        is_available: true 
      }
    ]);

    if (!error) {
      toast.success("Item added to menu");
      setNewItem({ name: "", price: "", category: "Main Course", description: "" }); 
      fetchData();
    } else {
      toast.error(error.message);
    }
  };

  const deleteMenuItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (!error) {
      toast.success("Item deleted");
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome, {user?.email}</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="w-fit">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "bookings" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "menu" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Menu Management
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : activeTab === "bookings" ? (
        /* BOOKINGS TABLE */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{booking.name}</div>
                      <div className="text-xs text-gray-500">{booking.guests} guests • {booking.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* MENU MANAGEMENT */
        <div className="grid gap-8 md:grid-cols-3">
          {/* Add New Item Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h3 className="font-semibold text-lg mb-4">Add New Item</h3>
            <form onSubmit={addMenuItem} className="space-y-4">
              <div>
                <Label>Item Name</Label>
                <Input 
                  value={newItem.name} 
                  onChange={e => setNewItem({...newItem, name: e.target.value})} 
                  placeholder="e.g. Beef Burger" 
                />
              </div>
              <div>
                <Label>Price (KES)</Label>
                <Input 
                  type="number" 
                  value={newItem.price} 
                  onChange={e => setNewItem({...newItem, price: e.target.value})} 
                  placeholder="800" 
                />
              </div>
              <div>
                <Label>Category</Label>
                <select 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                >
                  <option>Main Course</option>
                  <option>Starters</option>
                  <option>Drinks</option>
                  <option>Dessert</option>
                  <option>Snack</option>
                  <option>Breakfast</option>
            
                </select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={newItem.description} 
                  onChange={e => setNewItem({...newItem, description: e.target.value})} 
                  placeholder="e.g. Served with fries and salad" 
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </form>
          </div>

          {/* Menu List */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.category}</div>
                      {item.description && <div className="text-xs text-gray-400 italic mt-1">{item.description}</div>}
                    </td>
                    <td className="px-6 py-4 font-medium">KES {item.price}</td>
                    <td className="px-6 py-4 text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => deleteMenuItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;