import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-venue.jpg";

const HeroSection = () => {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bamboo Woods Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            style={{ marginTop: '3cm' }}
          >
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-charcoal font-medium text-sm">
              Loved by Our Community
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream font-bold leading-tight mb-6">
            Dine, Celebrate &{" "}
            <span className="text-gold-light italic">Gather</span>{" "}
            at Bamboo Woods
          </h1>

          {/* Value Statement */}
          <p className="text-cream/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            A charming restaurant with beautiful outdoor spaces—perfect for 
            everyday dining, intimate gatherings, and special celebrations.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => {
                const element = document.querySelector("#dining");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group"
            >
              Explore Our Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={scrollToBooking}
              className="border-cream/80 text-cream hover:bg-cream hover:text-charcoal"
            >
              Book a Table or Event
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: "5+", label: "Years Serving" },
              { value: "100+", label: "Events Hosted" },
              { value: "98%", label: "Happy Guests" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-gold font-bold">
                  {stat.value}
                </div>
                <div className="text-cream/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cream/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-cream/80 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
