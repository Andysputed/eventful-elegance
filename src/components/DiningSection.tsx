import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils, ChefHat, Clock, Leaf } from "lucide-react";
import restaurantImage from "@/assets/restaurant.jpg";

const diningFeatures = [
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description: "Our culinary team creates memorable dining experiences",
  },
  {
    icon: Utensils,
    title: "Custom Menus",
    description: "Tailored menus to match your event theme and preferences",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Professional staff ensuring seamless event catering",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Locally sourced, quality ingredients in every dish",
  },
];

const DiningSection = () => {
  return (
    <section id="dining" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <span className="text-gold font-medium uppercase tracking-wider text-sm">
              Restaurant & Catering
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-6">
              Exquisite Cuisine for Every Occasion
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our award-winning restaurant serves delectable dishes to event
              guests and walk-in customers alike. From elegant multi-course
              dinners to casual buffet spreads, we craft culinary experiences
              that complement your celebration.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {diningFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                variant="hero"
                size="lg"
                onClick={() => {
                  const element = document.querySelector("#booking");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Request Catering Quote
              </Button>
              <Button variant="elegant" size="lg">
                View Sample Menu
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={restaurantImage}
                alt="Grand Vista Restaurant"
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
              className="absolute -bottom-6 -left-6 bg-forest text-cream p-6 rounded-2xl shadow-elevated"
            >
              <div className="text-center">
                <Utensils className="w-8 h-8 mx-auto mb-2" />
                <div className="font-display text-lg font-bold">Full</div>
                <div className="text-cream/80 text-sm">Catering Service</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;