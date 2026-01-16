import { motion } from "framer-motion";
import { Shield, Heart, Sparkles, Clock, Award, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Peace of Mind",
    description:
      "Relax knowing every detail is handled by our experienced team. From setup to cleanup, we've got you covered.",
  },
  {
    icon: Heart,
    title: "Personalized Touch",
    description:
      "Every event is unique. We work closely with you to bring your vision to life with custom solutions.",
  },
  {
    icon: Sparkles,
    title: "Beautiful Surroundings",
    description:
      "Our stunning venue provides the perfect backdrop for photos and memories that last a lifetime.",
  },
  {
    icon: Clock,
    title: "Stress-Free Planning",
    description:
      "Our all-in-one approach means one venue, one team, and one seamless experience from start to finish.",
  },
  {
    icon: Award,
    title: "Proven Excellence",
    description:
      "With 500+ successful events and glowing reviews, our track record speaks for itself.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Personal event coordinator assigned to you, available to answer questions and solve problems.",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-charcoal text-cream relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium uppercase tracking-wider text-sm">
            Why Bamboo Woods?
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Your Perfect Event, <span className="text-gold">Guaranteed</span>
          </h2>
          <p className="text-cream/70 text-lg">
            We understand how important your special day is. That's why we go
            above and beyond to ensure everything is perfect.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-cream/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-8 h-full hover:bg-cream/10 transition-colors">
                <div className="w-14 h-14 bg-gold/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors">
                  <reason.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {reason.title}
                </h3>
                <p className="text-cream/70 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;