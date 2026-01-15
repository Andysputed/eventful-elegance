import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, TreePine, Users, Sparkles } from "lucide-react";
import gazeboImage from "@/assets/gazebo.jpg";
import corporateImage from "@/assets/corporate-event.jpg";

const features = [
  "Charming outdoor gazebos",
  "Cozy meeting rooms",
  "Tent setup available for larger parties",
  "Accommodate up to 100 guests",
  "Beautiful garden setting",
  "Dedicated event support",
];

const VenueSection = () => {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="venue" className="py-24 bg-cream-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium uppercase tracking-wider text-sm">
            Our Spaces
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-4">
            More Than Just a Restaurant
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover our beautiful outdoor gazebos for casual dining and private 
            meeting rooms for your professional needs.
          </p>
        </motion.div>

        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Gazebos Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="relative h-64">
              <img
                src={gazeboImage}
                alt="Outdoor Gazebos"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-cream">
                <TreePine className="w-5 h-5" />
                <span className="font-medium">Garden Gazebos</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-display text-xl text-charcoal font-semibold mb-3">
                Charming Outdoor Gazebos
              </h4>
              <p className="text-muted-foreground mb-4">
                Enjoy your meal surrounded by nature in our beautiful garden 
                gazebos. Perfect for casual dining, small gatherings, or simply 
                relaxing with friends and family.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>2-10 guests per gazebo</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Meeting Rooms Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="relative h-64">
              <img
                src={corporateImage}
                alt="Meeting Rooms"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-cream">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Meeting Rooms</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-display text-xl text-charcoal font-semibold mb-3">
                Professional Meeting Spaces
              </h4>
              <p className="text-muted-foreground mb-4">
                Need a quiet space for business? Our meeting rooms are equipped 
                for small corporate gatherings, team meetings, and professional 
                workshops.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Up to 30 guests</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Event Space CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl text-cream font-bold mb-4">
            Planning a Special Event?
          </h3>
          <p className="text-cream/80 max-w-2xl mx-auto mb-6">
            For larger gatherings up to 100 guests, we offer tent setups on our 
            grounds. Perfect for birthdays, baby showers, graduations, and 
            intimate celebrations.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-cream/80 text-sm"
              >
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
          <Button variant="hero" size="lg" onClick={scrollToBooking}>
            Inquire About Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
