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

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Baby Shower",
  "Corporate Event",
  "Graduation Party",
  "Private Function",
  "Other",
];

const guestRanges = [
  "Under 50",
  "50-100",
  "100-200",
  "200-300",
  "300-500",
  "500+",
];

const BookingForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.eventType || !formData.eventDate) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
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
              Thank You for Your Inquiry!
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Our events team has received your request and will contact you
              within 24 hours to discuss your special event.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Inquiry
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
              Start Planning
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-6">
              Book Your Event Today
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Ready to create unforgettable memories? Fill out this form and
              our dedicated events team will reach out within 24 hours to
              discuss your vision.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Calendar, text: "Flexible date availability" },
                { icon: Users, text: "Accommodates 50 to 500+ guests" },
                { icon: Sparkles, text: "Customizable packages to fit your budget" },
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
                Prefer to Talk?
              </h4>
              <p className="text-cream/80 mb-2">Call us directly:</p>
              <a
                href="tel:+1234567890"
                className="text-gold font-bold text-xl hover:text-gold-light transition-colors"
              >
                +1 (234) 567-890
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

                {/* Event Type */}
                <div className="space-y-2">
                  <Label className="text-charcoal font-medium">
                    Event Type *
                  </Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, eventType: value })
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
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
                        <SelectValue placeholder="Estimated guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-charcoal font-medium">
                    Additional Details
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your event vision..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Submit */}
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Submit Inquiry
                </Button>

                <p className="text-center text-muted-foreground text-sm">
                  We'll respond within 24 hours. No commitment required.
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