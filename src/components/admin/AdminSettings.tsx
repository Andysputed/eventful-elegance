import { Settings, Shield, User, Bell } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { cardShell } from "./types";
import { Button } from "@/components/ui/button";

export const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className={`p-6 ${cardShell}`}>
        <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
          Account & Dashboard Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your administrator profile, security preferences, and automated alerts.
        </p>
      </div>

      {/* Account Info */}
      <div className={`p-6 ${cardShell} space-y-4`}>
        <div className="flex items-center gap-3 pb-3 border-b border-gold/15">
          <User className="h-5 w-5 text-gold-dark" />
          <h2 className="font-semibold text-charcoal text-lg">Administrator Profile</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Email Address
            </label>
            <p className="text-sm font-medium text-charcoal mt-1">
              {user?.email || "admin@bamboowoods.co.ke"}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Role
            </label>
            <p className="text-sm font-medium text-charcoal mt-1">
              Super Administrator
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Account Created
            </label>
            <p className="text-sm font-medium text-charcoal mt-1">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Active"}
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Authentication Provider
            </label>
            <p className="text-sm font-medium text-charcoal mt-1">
              Supabase Auth (Password)
            </p>
          </div>
        </div>
      </div>

      {/* Security & Notifications */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className={`p-6 ${cardShell} space-y-3`}>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gold-dark" />
            <h3 className="font-semibold text-charcoal">Security & Sessions</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your session is secured using JWT authentication. Only authorized administrative personnel may access these modules.
          </p>
        </div>

        <div className={`p-6 ${cardShell} space-y-3`}>
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-gold-dark" />
            <h3 className="font-semibold text-charcoal">Email Notifications</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Automated reservation confirmation and cancellation emails are dispatched via the Supabase Edge Function pipeline (<code className="text-xs bg-gold/10 px-1 py-0.5 rounded text-gold-dark">booking-email</code>).
          </p>
        </div>
      </div>
    </div>
  );
};
