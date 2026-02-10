import { motion } from "framer-motion";
import { FerrisWheel, Wind, ShieldCheck, Smile, Car } from "lucide-react";

const playgroundFeatures = [
  {
    icon: FerrisWheel,
    title: "Spinners",
    description: "Safe, spinning fun for the little ones to enjoy together.",
  },
  {
    icon: Wind,
    title: "Classic Swings",
    description: "Traditional forward and backward swings that kids love.",
  },
  {
    icon: Car,
    title: "Racing Cars",
    description: "Exciting play cars for mini-drivers to race and explore.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Environment",
    description: "Fenced and monitored area so parents can dine in peace.",
  },
];

const PlaygroundSection = () => {
  return (
    <section id="playground" className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold font-medium uppercase tracking-widest text-sm"
          >
            Family Friendly
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mt-4 mb-6">
            The Bamboo Kids' Zone
          </h2>
          <p className="text-muted-foreground text-lg">
            Let the children explore our secure playground while you enjoy your meal. 
            From high-flying swings to racing cars and spinners, we have it all.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {playgroundFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gold/5 hover:border-gold/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <feature.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl text-charcoal mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- IMAGE PLACEHOLDERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="group relative h-72 rounded-2xl overflow-hidden bg-gray-200"
          >
            {/* Replace 'src' with your Racing Car photo path later */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
              <span className="font-display font-bold">RACING CARS PHOTO</span>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 left-4 text-white font-bold">Mini Racers</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="group relative h-72 rounded-2xl overflow-hidden bg-gray-200"
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
              <span className="font-display font-bold">SWINGS PHOTO</span>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 left-4 text-white font-bold">High-Flying Swings</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="group relative h-72 rounded-2xl overflow-hidden bg-gray-200"
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
              <span className="font-display font-bold">MERRY-GO-ROUND PHOTO</span>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-4 left-4 text-white font-bold">Spinning Fun</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundSection;