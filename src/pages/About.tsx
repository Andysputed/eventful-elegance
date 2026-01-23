import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about-us" className="py-24 bg-cream-dark">
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
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-4">
            Welcome to Eventful Elegance
          </h2>
          <p className="text-muted-foreground text-lg">
            Eventful Elegance is more than just a restaurant—it's a destination for unforgettable experiences. Nestled in the heart of the city, our venue combines exquisite cuisine, elegant décor, and exceptional service to create the perfect setting for weddings, corporate events, family celebrations, and more.
          </p>
        </motion.div>

        {/* Restaurant Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h3 className="font-display text-2xl text-gold font-bold mb-4">Our Story</h3>
            <p className="text-charcoal leading-relaxed">
              Founded in 2020, Eventful Elegance has quickly become a beloved gathering place for locals and visitors alike. Our team is passionate about crafting memorable moments, whether you're enjoying a romantic dinner or hosting a grand celebration.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h3 className="font-display text-2xl text-gold font-bold mb-4">Location</h3>
            <p className="text-charcoal leading-relaxed">
              Conveniently located at 123 Celebration Avenue, City Center, our restaurant offers easy access and ample parking. Step inside to discover a warm, inviting atmosphere and beautifully landscaped outdoor spaces perfect for any occasion.
            </p>
          </div>
        </div>

        {/* Venue Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-charcoal rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2020", label: "Year Established" },
              { value: "100+", label: "Events Hosted" },
              { value: "5 Stars", label: "Guest Satisfaction" },
              { value: "City Center", label: "Prime Location" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="font-display text-4xl md:text-5xl text-gold font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-cream/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
