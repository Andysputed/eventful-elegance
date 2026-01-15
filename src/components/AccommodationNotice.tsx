import { motion } from "framer-motion";
import { Building2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const AccommodationNotice = () => {
  const [email, setEmail] = useState("");

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when our accommodation services launch.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-6">
            <Building2 className="w-5 h-5" />
            <span className="font-medium text-sm">Coming Soon</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-bold mb-4">
            On-Site Accommodation
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We're excited to announce that luxury accommodation services are
            coming soon! Soon your guests will be able to stay on-site,
            making your event even more convenient and memorable.
          </p>

          {/* Notify Me Form */}
          <form
            onSubmit={handleNotify}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1"
            />
            <Button type="submit" variant="hero" size="lg" className="shrink-0">
              <Bell className="w-4 h-4 mr-2" />
              Notify Me
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AccommodationNotice;