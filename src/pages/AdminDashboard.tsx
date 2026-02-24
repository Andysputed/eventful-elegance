import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, LogOut, Plus, Trash2, Check, X, RotateCcw, 
  Pencil, Search, AlertCircle, Send, Phone, Mail, ChevronLeft, ChevronRight, Calendar, Users 
} from "lucide-react"; 
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

const ITEMS_PER_PAGE = 10;
const cardShell = "rounded-2xl border border-gold/15 bg-card/95 shadow-soft";
const primaryAction =
  "bg-gradient-to-r from-gold to-gold-dark text-cream shadow-gold hover:shadow-elevated hover:scale-[1.01] active:scale-[0.99]";
const positiveAction = "bg-green-600 text-white hover:bg-green-700";
const dangerAction =
  "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800";
const subtleAction =
  "border border-gold/25 bg-cream/70 text-charcoal hover:bg-gold/10 hover:border-gold/40";

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // --- PAGINATION & VIEW STATE ---
  const [page, setPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [viewMode, setViewMode] = useState<"upcoming" | "history">("upcoming");

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

  // Fetch data when Tab, Page, or View Mode changes
  useEffect(() => {
    fetchData();
  }, [activeTab, page, viewMode]);

  // Reset to page 1 if search term changes
  useEffect(() => {
    if (activeTab === "bookings") {
        setPage(1); 
        fetchData(); 
    }
  }, [searchTerm]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === "bookings") {
      const today = new Date().toISOString().split('T')[0];
      
      let query = supabase
        .from('bookings')
        .select('*', { count: 'exact' });

      // 1. DATE FILTER & SORTING
      if (viewMode === "upcoming") {
        query = query.gte('date', today).order('date', { ascending: true });
      } else {
        query = query.lt('date', today).order('date', { ascending: false });
      }

      // 2. SEARCH
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`);
      }

      // 3. PAGINATION
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, count } = await query.range(from, to);

      if (data) setBookings(data);
      if (count !== null) setTotalBookings(count);
      
    } else {
      const { data } = await supabase.from('menu_items').select('*').order('category', { ascending: true });
      if (data) setMenuItems(data);
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(totalBookings / ITEMS_PER_PAGE);

  // --- BOOKING LOGIC WITH EMAILS ---
  const confirmBooking = async (booking: Booking) => {
    const loadingToast = toast.loading("Confirming & Sending Email...");

    try {
      const { error: fnError } = await supabase.functions.invoke('booking-email', {
        body: {
          type: 'confirmation',
          booking: {
            name: booking.name,
            email: booking.email,
            date: booking.date,
            guests: booking.guests
          }
        }
      });

      if (fnError) {
        console.error("Email failed:", fnError);
        toast.error("Email failed, but confirming in database...");
      }

      const { error: dbError } = await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', booking.id);

      toast.dismiss(loadingToast);

      if (!dbError) {
        toast.success("Booking Confirmed & Email Sent! ✅");
        setBookings((prev) => prev.map((b) => b.id === booking.id ? { ...b, status: 'confirmed' } : b));
      } else {
        toast.error("Database error");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
      console.error(err);
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
      const { error: fnError } = await supabase.functions.invoke('booking-email', {
        body: {
          type: 'rejection',
          booking: {
            name: rejectingBooking.name,
            email: rejectingBooking.email,
            date: rejectingBooking.date,
            guests: rejectingBooking.guests
          },
          message: message
        }
      });

      if (fnError) {
        console.error("Email failed:", fnError);
        toast.error("Could not send email, but cancelling booking...");
      }

      const { error: dbError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', rejectingBooking.id);

      toast.dismiss(loadingToast);

      if (!dbError) {
        toast.success(`Guest notified & Booking Cancelled 🚫`);
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
    const shouldSignOut = window.confirm("Sign out from the admin dashboard?");
    if (!shouldSignOut) return;
    await signOut();
    navigate("/admin-login");
  };

  // --- HELPER COMPONENT FOR STATUS ---
  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
      status === 'confirmed'
        ? 'bg-green-100 text-green-700 border-green-200'
        : status === 'cancelled'
        ? 'border-red-100 bg-red-50 text-red-700'
        : 'border-gold/25 bg-gold/10 text-gold-dark'
    }`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero p-4 pb-20 md:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
      </div>
      
      {/* --- REJECTION MODAL --- */}
      {rejectingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="max-w-md w-full overflow-hidden rounded-2xl border border-red-100 bg-card shadow-elevated animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 border-b border-red-100 bg-red-50 p-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">Decline Reservation</h3>
                <p className="text-xs text-red-600 font-medium">This action cannot be undone.</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label className="text-charcoal/80">Reason for rejection</Label>
                <select 
                  className="mt-1.5 w-full rounded-md border border-input bg-background p-2.5 text-sm focus:border-red-500 focus:ring-red-500"
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
            <div className="p-4 bg-cream/60 flex justify-end gap-3 border-t border-gold/15">
              <Button variant="ghost" onClick={() => setRejectingBooking(null)}>Cancel</Button>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 gap-2" onClick={completeRejection}>
                <Send className="h-4 w-4" /> Send & Decline
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`relative z-10 mb-6 flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between ${cardShell}`}>
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">Admin Dashboard</h1>
          <p className="max-w-[250px] truncate text-sm text-muted-foreground">Welcome, {user?.email}</p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full justify-center border-red-200 bg-red-50/70 text-red-700 hover:bg-red-100 md:w-fit"
        >
          <LogOut className="mr-2 h-4 w-4" /> Exit Admin
        </Button>
      </div>

      {/* Tabs */}
      <div className="relative z-10 mb-6 flex w-full rounded-2xl border border-gold/30 bg-card/90 p-1.5 shadow-soft">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm md:text-base font-semibold transition-all duration-300 ${
            activeTab === "bookings"
              ? "bg-gradient-to-r from-gold to-gold-dark text-cream shadow-gold"
              : "bg-cream/60 text-charcoal/75 hover:bg-cream hover:text-charcoal"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm md:text-base font-semibold transition-all duration-300 ${
            activeTab === "menu"
              ? "bg-gradient-to-r from-forest to-forest-light text-cream shadow-soft"
              : "bg-cream/60 text-charcoal/75 hover:bg-cream hover:text-charcoal"
          }`}
        >
          Menu
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold/70" />
        </div>
      ) : activeTab === "bookings" ? (
        /* BOOKINGS TAB */
        <div className="relative z-10">
          {/* Controls: Toggle & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
             <div className="flex w-full bg-cream/70 p-1 rounded-lg border border-gold/25 md:w-auto">
                <button 
                  onClick={() => { setViewMode("upcoming"); setPage(1); }}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    viewMode === "upcoming"
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-green-700 hover:bg-green-50"
                  }`}
                >
                  Upcoming
                </button>
                <button 
                  onClick={() => { setViewMode("history"); setPage(1); }}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    viewMode === "history"
                      ? "bg-gold-dark text-cream shadow-sm"
                      : "text-gold-dark hover:bg-gold/10"
                  }`}
                >
                  History
                </button>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search name or phone..." 
                  className="pl-10 bg-white/90 w-full border-gold/25 focus-visible:ring-gold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
          </div>

          {/* --- MOBILE VIEW (CARDS) --- */}
          <div className="md:hidden space-y-4 mb-6">
            {bookings.map((booking) => (
              <div key={booking.id} className={`flex flex-col gap-4 p-5 ${cardShell}`}>
                
                {/* Header Row */}
                <div className="flex justify-between items-start">
                   <div className="flex flex-col">
                      <span className="font-bold text-charcoal text-lg">{booking.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                         <Calendar className="w-3 h-3" />
                         {new Date(booking.date).toLocaleDateString()}
                         <span className="text-gold/40">|</span>
                         <Users className="w-3 h-3" />
                         {booking.guests} Guests
                      </div>
                   </div>
                   <StatusBadge status={booking.status} />
                </div>

                {/* Contact Details */}
                <div className="bg-cream/70 border border-gold/15 p-3 rounded-lg space-y-2 text-sm">
                   <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-charcoal/80">
                      <Phone className="w-4 h-4 text-gold-dark" /> {booking.phone}
                   </a>
                   <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-charcoal/80">
                      <Mail className="w-4 h-4 text-gold-dark" /> {booking.email}
                   </a>
                </div>

                {/* Message (if any) */}
                {booking.message && (
                  <div className="text-xs text-charcoal/70 italic bg-gold/10 p-2 rounded border border-gold/20">
                    "{booking.message}"
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 border-t border-gold/15 flex gap-2">
                   {booking.status === 'pending' ? (
                     <>
                        <Button className={`flex-1 ${positiveAction}`} onClick={() => confirmBooking(booking)}>
                           <Check className="w-4 h-4 mr-2" /> Accept
                        </Button>
                        <Button variant="outline" className={`flex-1 ${dangerAction}`} onClick={() => initiateRejection(booking)}>
                           <X className="w-4 h-4 mr-2" /> Reject
                        </Button>
                     </>
                   ) : (
                     <Button variant="outline" size="sm" className={`w-full ${subtleAction}`} onClick={() => undoStatus(booking.id)}>
                        <RotateCcw className="w-4 h-4 mr-2" /> Undo Status
                     </Button>
                   )}
                </div>
              </div>
            ))}
            {bookings.length === 0 && <div className="text-center py-10 text-muted-foreground">No bookings found.</div>}
          </div>

          {/* --- DESKTOP VIEW (TABLE) --- */}
          <div className={`hidden md:block overflow-hidden mb-4 ${cardShell}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-cream-dark/70 text-muted-foreground font-medium">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-cream/60">
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-charcoal">{booking.name}</div>
                        <div className="text-xs text-muted-foreground">{booking.guests} guests • {booking.type}</div>
                        {booking.message && (
                          <div className="mt-1 text-xs text-gold-dark bg-gold/10 border border-gold/20 p-1 rounded inline-block max-w-[200px] truncate">
                            "{booking.message}"
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <a href={`tel:${booking.phone}`} className="flex items-center gap-2 text-xs font-medium text-charcoal/80 hover:text-forest transition-colors">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {booking.phone}
                          </a>
                          <a href={`mailto:${booking.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-forest transition-colors">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {booking.email.length > 20 ? booking.email.substring(0, 18) + '...' : booking.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={booking.status} /></td>
                      <td className="px-6 py-4 text-right">
                        {booking.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50 bg-green-100/50" onClick={() => confirmBooking(booking)} title="Confirm"><Check className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-200/80 bg-red-100/70" onClick={() => initiateRejection(booking)} title="Reject"><X className="h-4 w-4" /></Button>
                          </div>
                        ) : (
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-gold-dark hover:bg-gold/10" onClick={() => undoStatus(booking.id)} title="Undo"><RotateCcw className="h-3 w-3" /></Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No bookings found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex items-center justify-between px-2 pb-8 md:pb-0">
            <span className="text-xs md:text-sm text-muted-foreground">
                Page {page} of {Math.max(1, totalPages)}
            </span>
            <div className="flex gap-2">
                <Button variant="outline" className={subtleAction} size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className={subtleAction} size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </div>
      ) : (
        /* MENU TAB */
        <div className="relative z-10 grid gap-8 md:grid-cols-3">
          {/* Add Item Form */}
          <div className={`bg-card/95 p-6 rounded-2xl border border-gold/15 shadow-soft h-fit order-2 md:order-1`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-charcoal">{editingId ? "Edit Item" : "Add New Item"}</h3>
              {editingId && (
                <Button variant="ghost" size="sm" onClick={resetForm} className="text-xs h-6 text-muted-foreground hover:text-charcoal">Cancel</Button>
              )}
            </div>
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <Label>Item Name</Label>
                <Input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Beef Burger" />
              </div>
              <div>
                <Label>Price (KES)</Label>
                <Input type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} placeholder="800" />
              </div>
              <div>
                <Label>Category</Label>
                <select 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
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
                <Textarea value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} placeholder="e.g. Served with fries" className="resize-none"/>
              </div>
              <Button type="submit" className={`w-full ${editingId ? positiveAction : primaryAction}`}>
                {editingId ? <><Pencil className="mr-2 h-4 w-4" /> Update Item</> : <><Plus className="mr-2 h-4 w-4" /> Add Item</>}
              </Button>
            </form>
          </div>

          {/* Menu Items List */}
          <div className="md:col-span-2 space-y-4 order-1 md:order-2">
            
            {/* Mobile List View */}
            <div className="md:hidden space-y-3">
              {menuItems.map(item => (
                <div key={item.id} className="bg-card/95 p-4 rounded-xl border border-gold/15 shadow-soft flex justify-between items-center">
                   <div>
                      <div className="font-semibold text-charcoal">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                      <div className="font-medium text-forest mt-1">KES {item.price}</div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gold-dark bg-gold/15 hover:bg-gold/25" onClick={() => startEditing(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 bg-red-100/70 hover:bg-red-200/80" onClick={() => deleteMenuItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                   </div>
                </div>
              ))}
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
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-cream/60">
                      <td className="px-6 py-4">
                        <div className="font-medium text-charcoal">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-forest">KES {item.price}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gold-dark hover:bg-gold/15" onClick={() => startEditing(item)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-100/70" onClick={() => deleteMenuItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
