import { Bed, Sparkles, Clock } from "lucide-react";
import { cardShell } from "./types";

export const AccommodationManager = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 ${cardShell}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/15 text-gold-dark px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phase 2 Feature</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
              Accommodation Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage luxury cottages, guest suites, room availability, and guest check-ins.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className={`p-6 ${cardShell} text-center flex flex-col items-center justify-center space-y-3`}>
          <div className="h-12 w-12 rounded-2xl bg-gold/15 flex items-center justify-center text-gold-dark border border-gold/25">
            <Bed className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-charcoal text-lg">Room Inventory</h3>
          <p className="text-sm text-muted-foreground">
            Configure rooms, seasonal rates, and capacity limits.
          </p>
        </div>

        <div className={`p-6 ${cardShell} text-center flex flex-col items-center justify-center space-y-3`}>
          <div className="h-12 w-12 rounded-2xl bg-forest/15 flex items-center justify-center text-forest border border-forest/25">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-charcoal text-lg">Stay Reservations</h3>
          <p className="text-sm text-muted-foreground">
            Review guest check-ins, check-outs, and booking requests.
          </p>
        </div>

        <div className={`p-6 ${cardShell} text-center flex flex-col items-center justify-center space-y-3`}>
          <div className="h-12 w-12 rounded-2xl bg-cream-dark flex items-center justify-center text-charcoal border border-gold/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-charcoal text-lg">Integration</h3>
          <p className="text-sm text-muted-foreground">
            Synchronized with restaurant reservations and event packages.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className={`p-8 ${cardShell} text-center max-w-2xl mx-auto space-y-4`}>
        <div className="inline-flex h-14 w-14 rounded-2xl bg-gold/10 items-center justify-center text-gold border border-gold/20">
          <Bed className="h-7 w-7" />
        </div>
        <h2 className="font-display text-xl font-bold text-charcoal">
          Accommodation Module Under Construction
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The accommodation management suite is actively being prepared for deployment. Once live, you will be able to manage room allocations, nightly rates, and customer stay logs directly from this view.
        </p>
      </div>
    </div>
  );
};
