import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { cardShell } from "./types";

interface AdminLayoutProps {
  activeTab: "bookings" | "menu";
  onTabChange: (tab: "bookings" | "menu") => void;
  children: React.ReactNode;
}

export const AdminLayout = ({ activeTab, onTabChange, children }: AdminLayoutProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const shouldSignOut = window.confirm("Sign out from the admin dashboard?");
    if (!shouldSignOut) return;
    await signOut();
    navigate("/admin-login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero p-4 pb-20 md:p-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
      </div>

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

      {/* Navigation Tabs */}
      <div className="relative z-10 mb-6 flex w-full rounded-2xl border border-gold/30 bg-card/90 p-1.5 shadow-soft">
        <button
          onClick={() => onTabChange("bookings")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm md:text-base font-semibold transition-all duration-300 ${
            activeTab === "bookings"
              ? "bg-gradient-to-r from-gold to-gold-dark text-cream shadow-gold"
              : "bg-cream/60 text-charcoal/75 hover:bg-cream hover:text-charcoal"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => onTabChange("menu")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm md:text-base font-semibold transition-all duration-300 ${
            activeTab === "menu"
              ? "bg-gradient-to-r from-forest to-forest-light text-cream shadow-soft"
              : "bg-cream/60 text-charcoal/75 hover:bg-cream hover:text-charcoal"
          }`}
        >
          Menu
        </button>
      </div>

      {/* Domain Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
