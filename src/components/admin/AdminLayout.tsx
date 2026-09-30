import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Calendar,
  Bed,
  Utensils,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

interface NavItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  end?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Restaurant Bookings",
    to: "/admin",
    icon: Calendar,
    end: true,
  },
  {
    name: "Accommodation",
    to: "/admin/accommodation",
    icon: Bed,
    badge: "New",
  },
  {
    name: "Menu Management",
    to: "/admin/menu",
    icon: Utensils,
  },
  {
    name: "Settings / Account",
    to: "/admin/settings",
    icon: Settings,
  },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const shouldSignOut = window.confirm("Sign out from the admin dashboard?");
    if (!shouldSignOut) return;
    await signOut();
    navigate("/admin-login");
  };

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav className="flex-1 space-y-1.5 px-3 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onItemClick}
          className={({ isActive }) =>
            cn(
              "group flex items-center justify-between rounded-lg px-3.5 py-3 text-sm font-medium transition-all duration-200 border-l-4",
              isActive
                ? "bg-gold/15 text-gold border-gold font-semibold shadow-sm"
                : "text-cream/70 hover:text-cream hover:bg-white/5 border-transparent"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors duration-200",
                    isActive
                      ? "text-gold"
                      : "text-cream/60 group-hover:text-gold/90"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </div>
              {item.badge && (
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-light border border-gold/30">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  const renderSidebarFooter = () => (
    <div className="p-4 border-t border-gold/15 space-y-3 bg-black/10">
      {/* Admin User Card */}
      <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-white/5">
        <div className="h-8 w-8 rounded-full bg-forest/80 flex items-center justify-center text-cream text-xs font-bold border border-gold/30 shrink-0">
          {user?.email?.charAt(0).toUpperCase() || "A"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-cream truncate">
            {user?.email || "Admin User"}
          </p>
          <p className="text-[10px] text-gold/80 font-medium">Administrator</p>
        </div>
      </div>

      {/* Pinned Logout Button */}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-charcoal text-cream">
      {/* ========================================================
          DESKTOP SIDEBAR (w-64, h-screen, fixed / sticky left)
      ======================================================== */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:h-screen sticky top-0 bg-charcoal border-r border-gold/15 z-30 shadow-elevated">
        {/* Brand Header */}
        <div className="p-6 border-b border-gold/15 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-charcoal font-display font-bold text-lg shadow-gold shrink-0">
            BW
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-base text-cream tracking-wide truncate">
              Bamboo Woods
            </h2>
            <p className="text-[10px] text-gold tracking-widest uppercase font-semibold">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto">
          {renderNavLinks()}
        </div>

        {/* Pinned Footer with User Info & Logout */}
        {renderSidebarFooter()}
      </aside>

      {/* ========================================================
          MOBILE TOP NAVBAR & SLIDE-OUT DRAWER (SHEET)
      ======================================================== */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-charcoal text-cream border-b border-gold/15 shadow-soft">
        <div className="flex items-center gap-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-cream hover:bg-white/10 hover:text-gold"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 bg-charcoal text-cream border-r border-gold/20 p-0 flex flex-col justify-between"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Admin Navigation</SheetTitle>
                <SheetDescription>
                  Access operational and administrative dashboard sections
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Drawer Brand Header */}
              <div className="p-5 border-b border-gold/15 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-charcoal font-display font-bold text-base shadow-gold shrink-0">
                  BW
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-cream tracking-wide">
                    Bamboo Woods
                  </h3>
                  <p className="text-[10px] text-gold tracking-widest uppercase font-semibold">
                    Admin Portal
                  </p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                {renderNavLinks(() => setMobileOpen(false))}
              </div>

              {/* Mobile Drawer Footer */}
              {renderSidebarFooter()}
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-charcoal font-display font-bold text-xs shadow-gold shrink-0">
              BW
            </div>
            <span className="font-display font-bold text-base text-cream tracking-wide">
              Bamboo Woods
            </span>
          </div>
        </div>

        <span className="text-[11px] text-gold font-semibold uppercase tracking-wider bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
          Admin
        </span>
      </header>

      {/* ========================================================
          MAIN CONTENT AREA (Right of sidebar, with <Outlet />)
      ======================================================== */}
      <main className="flex-1 min-h-screen relative overflow-y-auto bg-gradient-hero p-4 pb-20 md:p-8">
        {/* Ambient atmospheric glow orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
          <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
        </div>

        {/* Content Shell */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
