import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  X,
  RotateCcw,
  Search,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "./StatusBadge";
import { BookingRejectionModal } from "./BookingRejectionModal";
import {
  Booking,
  ITEMS_PER_PAGE,
  cardShell,
  positiveAction,
  dangerAction,
  subtleAction,
} from "./types";

export const BookingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Pagination & View State
  const [page, setPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [viewMode, setViewMode] = useState<"upcoming" | "history">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  // Rejection Modal State
  const [rejectingBooking, setRejectingBooking] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState("fully_booked");

  // Fetch data when Page or View Mode changes
  useEffect(() => {
    fetchBookings();
  }, [page, viewMode]);

  // Reset to page 1 if search term changes
  useEffect(() => {
    setPage(1);
    fetchBookings();
  }, [searchTerm]);

  const fetchBookings = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    let query = supabase.from("bookings").select("*", { count: "exact" });

    // 1. DATE FILTER & SORTING
    if (viewMode === "upcoming") {
      query = query.gte("date", today).order("date", { ascending: true });
    } else {
      query = query.lt("date", today).order("date", { ascending: false });
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
    setLoading(false);
  };

  const totalPages = Math.ceil(totalBookings / ITEMS_PER_PAGE);

  // --- BOOKING LOGIC WITH EMAILS ---
  const confirmBooking = async (booking: Booking) => {
    const loadingToast = toast.loading("Confirming & Sending Email...");

    try {
      const { error: fnError } = await supabase.functions.invoke("booking-email", {
        body: {
          type: "confirmation",
          booking: {
            name: booking?.name,
            email: booking?.email,
            date: booking?.date,
            guests: booking?.guests,
          },
        },
      });

      if (fnError) {
        console.error("Email failed:", fnError);
        toast.error("Email failed, but confirming in database...");
      }

      const { error: dbError } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", booking?.id);

      toast.dismiss(loadingToast);

      if (!dbError) {
        toast.success("Booking Confirmed & Email Sent! ✅");
        setBookings((prev) =>
          prev.map((b) => (b.id === booking?.id ? { ...b, status: "confirmed" } : b))
        );
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
    const { error } = await supabase
      .from("bookings")
      .update({ status: "pending" })
      .eq("id", id);
    if (!error) {
      toast.info("Status reverted to Pending ↺");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "pending" } : b))
      );
    }
  };

  const initiateRejection = (booking: Booking) => {
    setRejectingBooking(booking);
    setRejectionReason("fully_booked");
  };

  const completeRejection = async () => {
    if (!rejectingBooking) return;

    const message =
      rejectionReason === "fully_booked"
        ? `Dear ${rejectingBooking?.name}, thank you for choosing Bamboo Woods. Unfortunately, we are fully booked for ${new Date(
            rejectingBooking?.date || ""
          ).toLocaleDateString()}. We sincerely apologize and hope to host you another time.`
        : `Dear ${rejectingBooking?.name}, unfortunately we cannot fulfill your reservation request at this time.`;

    const loadingToast = toast.loading("Sending email & updating status...");

    try {
      const { error: fnError } = await supabase.functions.invoke("booking-email", {
        body: {
          type: "rejection",
          booking: {
            name: rejectingBooking?.name,
            email: rejectingBooking?.email,
            date: rejectingBooking?.date,
            guests: rejectingBooking?.guests,
          },
          message: message,
        },
      });

      if (fnError) {
        console.error("Email failed:", fnError);
        toast.error("Could not send email, but cancelling booking...");
      }

      const { error: dbError } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", rejectingBooking?.id);

      toast.dismiss(loadingToast);

      if (!dbError) {
        toast.success(`Guest notified & Booking Cancelled 🚫`);
        setBookings((prev) =>
          prev.map((b) =>
            b.id === rejectingBooking?.id ? { ...b, status: "cancelled" } : b
          )
        );
        setRejectingBooking(null);
      } else {
        toast.error("Database error");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <BookingRejectionModal
        booking={rejectingBooking}
        rejectionReason={rejectionReason}
        onReasonChange={setRejectionReason}
        onCancel={() => setRejectingBooking(null)}
        onConfirm={completeRejection}
      />

      {/* Controls: Toggle & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="flex w-full bg-cream/70 p-1 rounded-lg border border-gold/25 md:w-auto">
          <button
            onClick={() => {
              setViewMode("upcoming");
              setPage(1);
            }}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewMode === "upcoming"
                ? "bg-green-600 text-white shadow-sm"
                : "text-green-700 hover:bg-green-50"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => {
              setViewMode("history");
              setPage(1);
            }}
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

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold/70" />
        </div>
      ) : (
        <>
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
                  <a
                    href={`tel:${booking.phone}`}
                    className="flex items-center gap-2 text-charcoal/80"
                  >
                    <Phone className="w-4 h-4 text-gold-dark" /> {booking.phone}
                  </a>
                  <a
                    href={`mailto:${booking.email}`}
                    className="flex items-center gap-2 text-charcoal/80"
                  >
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
                  {booking.status === "pending" ? (
                    <>
                      <Button
                        className={`flex-1 ${positiveAction}`}
                        onClick={() => confirmBooking(booking)}
                      >
                        <Check className="w-4 h-4 mr-2" /> Accept
                      </Button>
                      <Button
                        variant="outline"
                        className={`flex-1 ${dangerAction}`}
                        onClick={() => initiateRejection(booking)}
                      >
                        <X className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full ${subtleAction}`}
                      onClick={() => undoStatus(booking.id)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Undo Status
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No bookings found.
              </div>
            )}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-charcoal">{booking.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {booking.guests} guests • {booking.type}
                        </div>
                        {booking.message && (
                          <div className="mt-1 text-xs text-gold-dark bg-gold/10 border border-gold/20 p-1 rounded inline-block max-w-[200px] truncate">
                            "{booking.message}"
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <a
                            href={`tel:${booking.phone}`}
                            className="flex items-center gap-2 text-xs font-medium text-charcoal/80 hover:text-forest transition-colors"
                          >
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {booking.phone}
                          </a>
                          <a
                            href={`mailto:${booking.email}`}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-forest transition-colors"
                          >
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {booking.email.length > 20
                              ? booking.email.substring(0, 18) + "..."
                              : booking.email}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {booking.status === "pending" ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-600 hover:bg-green-50 bg-green-100/50"
                              onClick={() => confirmBooking(booking)}
                              title="Confirm"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600 hover:bg-red-200/80 bg-red-100/70"
                              onClick={() => initiateRejection(booking)}
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-gold-dark hover:bg-gold/10"
                            onClick={() => undoStatus(booking.id)}
                            title="Undo"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground">
                        No bookings found.
                      </td>
                    </tr>
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
              <Button
                variant="outline"
                className={subtleAction}
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className={subtleAction}
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
