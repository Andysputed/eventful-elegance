import { motion } from "framer-motion";
import { Wind, ShieldCheck, Smile, Car, RotateCw } from "lucide-react";

const playgroundFeatures = [
  {
    icon: RotateCw,
    title: "Spinning Zones",
    description: "High-energy spinning equipment for endless dizzying fun.",
  },
  {
    icon: Car,
    title: "Racing Cars",
    description: "Pedal-powered and play cars for our little speed champions.",
  },
  {
    icon: Wind,
    title: "Classic Swings",
    description: "Standard forward and backward swings for all ages to enjoy.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "A monitored, family-friendly area designed for peace of mind.",
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
            From high-flying swings to racing cars and spinning zones, we have it all.
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
          {/* Racing Cars Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="group relative h-80 rounded-2xl overflow-hidden bg-stone-200 border-2 border-dashed border-stone-300"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-6 text-center">
              <Car className="w-12 h-12 mb-4 opacity-20" />
              <span className="font-display font-bold text-lg uppercase tracking-wider">Racing Cars Photo</span>
              <p className="text-xs mt-2 italic">Suggested: Action shot of kids in play cars</p>
            </div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-6 left-6 text-white font-bold drop-shadow-md">Mini Racers Track</div>
          </motion.div>

          {/* Swings Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="group relative h-80 rounded-2xl overflow-hidden bg-stone-200 border-2 border-dashed border-stone-300"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-6 text-center">
              <Wind className="w-12 h-12 mb-4 opacity-20" />
              <span className="font-display font-bold text-lg uppercase tracking-wider">Swings Photo</span>
              <p className="text-xs mt-2 italic">Suggested: Wide shot of the swing sets</p>
            </div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-6 left-6 text-white font-bold drop-shadow-md">High-Flying Fun</div>
          </motion.div>

          {/* Spinning Zones Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="group relative h-80 rounded-2xl overflow-hidden bg-stone-200 border-2 border-dashed border-stone-300"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-6 text-center">
              <RotateCw className="w-12 h-12 mb-4 opacity-20" />
              <span className="font-display font-bold text-lg uppercase tracking-wider">Spinning Zones Photo</span>
              <p className="text-xs mt-2 italic">Suggested: Colorful spinning equipment</p>
            </div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-6 left-6 text-white font-bold drop-shadow-md">Spinning Adventures</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlaygroundSection;