import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Tent, TreePine, Users, Sparkles } from "lucide-react";
import tentImage from "@/assets/tent-grounds.jpg";
import gazeboImage from "@/assets/gazebo.jpg";
import corporateImage from "@/assets/corporate-event.jpg";

const features = [
  "Beautifully landscaped grounds",
  "Premium quality tents available",
  "Flexible layout options",
  "Accommodate 50 to 500+ guests",
  "Professional lighting setup",
  "Dedicated event coordinators",
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
        {/* Main Venue Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={tentImage}
                alt="Grand Vista Event Grounds"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-gold text-cream p-6 rounded-2xl shadow-gold"
            >
              <div className="text-center">
                <Tent className="w-8 h-8 mx-auto mb-2" />
                <div className="font-display text-lg font-bold">Premium</div>
                <div className="text-cream/80 text-sm">Tent Setups</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold font-medium uppercase tracking-wider text-sm">
              Our Venue
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-6">
              Beautiful Grounds & Elegant Tent Setups
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our meticulously maintained grounds provide the perfect canvas for
              your celebration. With spacious lawns, mature trees, and stunning
              views, every corner offers a picture-perfect backdrop.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-forest" />
                  </div>
                  <span className="text-charcoal">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" onClick={scrollToBooking}>
              Book a Venue Tour
            </Button>
          </motion.div>
        </div>

        {/* Gazebos & Meeting Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium uppercase tracking-wider text-sm">
            Additional Spaces
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-charcoal font-bold mt-3">
            Gazebos & Meeting Rooms
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
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
                Our beautiful garden gazebos offer the perfect spot for casual
                dining, intimate gatherings, or simply relaxing in nature.
                Available for walk-in customers and event guests alike.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>2-8 guests per gazebo</span>
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
                alt="Corporate Meeting Rooms"
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
                Equipped with modern amenities, our meeting rooms are ideal for
                corporate conferences, board meetings, presentations, and
                professional workshops.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>10-50 capacity options</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;