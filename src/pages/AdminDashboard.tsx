import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, LogOut, Plus, Trash2, Check, X, RotateCcw, 
  Pencil, Search, AlertCircle, Send, Phone, Mail 
} from "lucide-react"; // Added Phone and Mail icons
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
  description: string;
  is_available: boolean;
}

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // --- STATE FOR EDITING & SEARCH ---
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- STATE FOR REJECTION MODAL ---
  const [rejectingBooking, setRejectingBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState("fully_booked");

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

  // --- BOOKING LOGIC ---
  
  const confirmBooking = async (id: number) => {
    const { error } = await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', id);
    if (!error) {
      toast.success("Booking Confirmed! ✅");
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'confirmed' } : b));
    } else {
      toast.error("Error updating status");
    }
  };

  const undoStatus = async (id: number) => {
    const { error } = await supabase.from('bookings').update({ status: 'pending' }).eq('id', id);
    if (!error) {
      toast.info("Status reverted to Pending ↺");
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'pending' } : b));
    }
  };

  const initiateRejection = (booking: Booking) => {
    setRejectingBooking(booking);
    setRejectionReason("fully_booked"); 
  };

  const getPoliteMessage = () => {
    if (rejectionReason === 'fully_booked') {
      return `Dear ${rejectingBooking?.name}, thank you for choosing Bamboo Woods. Unfortunately, we are fully booked for ${new Date(rejectingBooking?.date || "").toLocaleDateString()}. We sincerely apologize and hope to host you another time.`;
    }
    return `Dear ${rejectingBooking?.name}, unfortunately we cannot fulfill your reservation request at this time.`;
  };

  const completeRejection = async () => {
    if (!rejectingBooking) return;

    const message = getPoliteMessage();
    const loadingToast = toast.loading("Sending email & updating status...");

    try {
      // Trigger the Email Function
      const { error: fnError } = await supabase.functions.invoke('send-rejection', {
        body: {
          email: rejectingBooking.email,
          name: rejectingBooking.name,
          message: message,
          subject: rejectionReason === 'fully_booked' ? 'Reservation Update: Fully Booked' : 'Regarding your reservation'
        }
      });

      if (fnError) {
        console.error("Email failed:", fnError);
        toast.dismiss(loadingToast);
        toast.error("Could not send email, but cancelling booking...");
      }

      const { error: dbError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', rejectingBooking.id);

      toast.dismiss(loadingToast);

      if (!dbError) {
        if (rejectionReason === 'fully_booked') {
          toast.success(`Guest notified & Booking Cancelled 🚫`);
        } else {
          toast.success(`Booking Rejected ❌`);
        }
        setBookings((prev) => prev.map((b) => b.id === rejectingBooking.id ? { ...b, status: 'cancelled' } : b));
        setRejectingBooking(null); 
      } else {
        toast.error("Database error");
      }

    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    }
  };

  // --- MENU LOGIC ---
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    if (editingId) {
      const { error } = await supabase
        .from('menu_items')
        .update({
          name: newItem.name,
          price: parseInt(newItem.price),
          category: newItem.category,
          description: newItem.description
        })
        .eq('id', editingId);

      if (!error) {
        toast.success("Item updated! ✨");
        setMenuItems(prev => prev.map(item => item.id === editingId ? { ...item, ...newItem, price: parseInt(newItem.price) } : item));
        resetForm();
      }
    } else {
      const { error } = await supabase.from('menu_items').insert([
        { ...newItem, price: parseInt(newItem.price), is_available: true }
      ]);

      if (!error) {
        toast.success("Item added! 🍲");
        fetchData(); 
        resetForm();
      }
    }
  };

  const deleteMenuItem = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (!error) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast.success("Item deleted");
    }
  };

  const startEditing = (item: MenuItem) => {
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setNewItem({ name: "", price: "", category: "Main Course", description: "" });
    setEditingId(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
      
      {/* --- REJECTION MODAL --- */}
      {rejectingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Decline Reservation</h3>
                <p className="text-xs text-red-600 font-medium">This action cannot be undone.</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label className="text-gray-600">Reason for rejection</Label>
                <select 
                  className="mt-1.5 w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-red-500 focus:ring-red-500"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                >
                  <option value="fully_booked">⛔ Fully Booked</option>
                  <option value="closed">🔒 Restaurant Closed</option>
                  <option value="other">📝 Other</option>
                </select>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message Preview</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Email / SMS</span>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{getPoliteMessage()}"
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setRejectingBooking(null)}>Cancel</Button>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 gap-2" onClick={completeRejection}>
                <Send className="h-4 w-4" /> Send & Decline
              </Button>
            </div>
          </div>
        </div>
      )}

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
        <div>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by guest name, phone..." 
              className="pl-10 max-w-md bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Contact Info</th> {/* NEW COLUMN */}
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings
                    .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.phone.includes(searchTerm))
                    .map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{booking.name}</div>
                        <div className="text-xs text-gray-500">{booking.guests} guests • {booking.type}</div>
                        {booking.message && (
                          <div className="mt-1 text-xs text-blue-600 bg-blue-50 p-1 rounded inline-block">
                            "{booking.message.substring(0, 30)}..."
                          </div>
                        )}
                      </td>
                      
                      {/* NEW CONTACT INFO COLUMN */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            <Phone className="h-3 w-3 text-gray-400" />
                            {booking.phone}
                          </a>
                          <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                            <Mail className="h-3 w-3 text-gray-400" />
                            {booking.email.length > 20 ? booking.email.substring(0, 18) + '...' : booking.email}
                          </a>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700 border border-green-200' : 
                          booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-100' : 
                          'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {booking.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50 bg-green-100/50"
                              onClick={() => confirmBooking(booking.id)}
                              title="Confirm"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50 bg-red-100/50"
                              onClick={() => initiateRejection(booking)}
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-3">
                            <span className={`text-xs font-medium italic ${booking.status === 'confirmed' ? 'text-green-600' : 'text-red-500'}`}>
                              {booking.status === 'confirmed' ? 'Accepted' : 'Rejected'}
                            </span>
                            <Button
                              size="icon" variant="ghost" className="h-7 w-7 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => undoStatus(booking.id)}
                              title="Undo"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* MENU MANAGEMENT */
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{editingId ? "Edit Item" : "Add New Item"}</h3>
              {editingId && (
                <Button variant="ghost" size="sm" onClick={resetForm} className="text-xs h-6 text-gray-500">Cancel</Button>
              )}
            </div>
            <form onSubmit={handleSaveItem} className="space-y-4">
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
                  placeholder="e.g. Served with fries" 
                  className="resize-none"
                />
              </div>
              <Button type="submit" className={`w-full ${editingId ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                {editingId ? <><Pencil className="mr-2 h-4 w-4" /> Update Item</> : <><Plus className="mr-2 h-4 w-4" /> Add Item</>}
              </Button>
            </form>
          </div>

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
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button 
                        size="icon" variant="ghost" className="h-8 w-8 text-blue-500 hover:bg-blue-50"
                        onClick={() => startEditing(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => deleteMenuItem(item.id)}
                      >
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