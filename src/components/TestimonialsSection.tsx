import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Michael",
    event: "Wedding",
    rating: 5,
    text: "Our wedding at Grand Vista exceeded all expectations. The grounds were stunning, the tent setup was magical, and the staff handled everything flawlessly. We didn't have to worry about a single thing!",
    avatar: "SM",
  },
  {
    name: "Jennifer Adams",
    event: "Corporate Event",
    rating: 5,
    text: "We hosted our company's annual gala here and received countless compliments. The venue's flexibility allowed us to create exactly the atmosphere we wanted. Highly professional team!",
    avatar: "JA",
  },
  {
    name: "The Williams Family",
    event: "Birthday Celebration",
    rating: 5,
    text: "My mother's 70th birthday party was absolutely perfect. The catering was exceptional, the gazebo setting was intimate, and the grandchildren loved running around the beautiful grounds.",
    avatar: "WF",
  },
  {
    name: "Emily Thompson",
    event: "Baby Shower",
    rating: 5,
    text: "Such a beautiful venue for my baby shower! The garden setting was picture-perfect and the team went above and beyond to accommodate all our special requests. Truly memorable!",
    avatar: "ET",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-cream-dark">
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
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it—hear from the hundreds of happy
            clients who've celebrated with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-gold/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-charcoal leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-cream font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-charcoal">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.event}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-charcoal rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Events Hosted" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "98%", label: "Would Recommend" },
              { value: "10+", label: "Years of Excellence" },
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

export default TestimonialsSection;