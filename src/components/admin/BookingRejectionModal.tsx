import { AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Booking } from "./types";

interface BookingRejectionModalProps {
  booking: Booking | null;
  rejectionReason: string;
  onReasonChange: (reason: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const BookingRejectionModal = ({
  booking,
  rejectionReason,
  onReasonChange,
  onCancel,
  onConfirm,
}: BookingRejectionModalProps) => {
  if (!booking) return null;

  const politeMessage =
    rejectionReason === "fully_booked"
      ? `Dear ${booking?.name}, thank you for choosing Bamboo Woods. Unfortunately, we are fully booked for ${new Date(booking?.date || "").toLocaleDateString()}. We sincerely apologize and hope to host you another time.`
      : `Dear ${booking?.name}, unfortunately we cannot fulfill your reservation request at this time.`;

  return (
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
              onChange={(e) => onReasonChange(e.target.value)}
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
              "{politeMessage}"
            </p>
          </div>
        </div>
        <div className="p-4 bg-cream/60 flex justify-end gap-3 border-t border-gold/15">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700 gap-2" onClick={onConfirm}>
            <Send className="h-4 w-4" /> Send & Decline
          </Button>
        </div>
      </div>
    </div>
  );
};
