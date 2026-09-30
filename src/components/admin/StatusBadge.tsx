interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
      status === "confirmed"
        ? "bg-green-100 text-green-700 border-green-200"
        : status === "cancelled"
        ? "border-red-100 bg-red-50 text-red-700"
        : "border-gold/25 bg-gold/10 text-gold-dark"
    }`}
  >
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);
