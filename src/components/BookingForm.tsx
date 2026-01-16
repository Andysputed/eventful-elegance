import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Users, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const reservationTypes = [
  "Table Reservation",
  "Birthday Party",
  "Baby Shower",
  "Corporate Meeting",
  "Graduation Party",
  "Intimate Wedding",
  "Private Function",
  "Other",
];

const guestRanges = [
  "1-4",
  "5-10",
  "11-20",
  "21-50",
  "51-100",
];

const BookingForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reservationType: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.reservationType || !formData.eventDate) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Reservation Request Sent!",
      description: "We'll confirm your booking within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-12 shadow-elevated"
          >
            <div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-forest" />
            </div>
            <h3 className="font-display text-3xl text-charcoal font-bold mb-4">
              Thank You!
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              We've received your request and will contact you within 24 hours
              to confirm your reservation.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => setIsSubmitted(false)}
            >
              Make Another Reservation
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-medium uppercase tracking-wider text-sm">
              Reservations
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-6">
              Book Your Visit
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Whether it's a table for dinner or space for a celebration, 
              we'd love to host you. Fill out the form and we'll get back 
              to you promptly.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Calendar, text: "Easy online reservations" },
                { icon: Users, text: "Accommodate up to 100 guests for events" },
                { icon: Sparkles, text: "Personalized service for every occasion" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-charcoal font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-charcoal text-cream p-6 rounded-xl">
              <h4 className="font-display text-lg font-semibold mb-3">
                Prefer to Call?
              </h4>
              <p className="text-cream/80 mb-2">Reach us directly:</p>
              <a
                href="tel:+1234567890"
                className="text-gold font-bold text-xl hover:text-gold-light transition-colors"
              >
                +254 742 776 921
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 shadow-elevated"
            >
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-charcoal font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-charcoal font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-charcoal font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (234) 567-890"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Reservation Type */}
                <div className="space-y-2">
                  <Label className="text-charcoal font-medium">
                    Reservation Type *
                  </Label>
                  <Select
                    value={formData.reservationType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, reservationType: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="What are you booking for?" />
                    </SelectTrigger>
                    <SelectContent>
                      {reservationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date & Guests */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-charcoal font-medium">
                      Preferred Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) =>
                        setFormData({ ...formData, eventDate: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-charcoal font-medium">
                      Number of Guests
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) =>
                        setFormData({ ...formData, guests: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="How many guests?" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range} guests
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-charcoal font-medium">
                    Special Requests
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Any dietary requirements or special requests..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Submit */}
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Submit Reservation
                </Button>

                <p className="text-center text-muted-foreground text-sm">
                  We'll confirm within 24 hours. Walk-ins also welcome!
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
