import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Heart, History, Users, Leaf, Trees } from "lucide-react";
import aboutImage from "@/assets/restaurant.jpg"; // Using your existing image

const values = [
  {
    icon: History,
    title: "Our Heritage",
    description: "Founded with a vision to blend modern hospitality with the natural beauty of our surroundings.",
  },
  {
    icon: Users,
    title: "Family First",
    description: "A safe haven where parents relax and kids explore our dedicated spinning & racing zones.",
  },
  {
    icon: Leaf,
    title: "Farm to Table",
    description: "We source our vegetables and meats locally to support our community and ensure freshness.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "From our kitchen to our service, we maintain the highest standards of quality and comfort.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-gold font-medium uppercase tracking-wider text-sm mb-4"
            >
              <Trees className="w-4 h-4" />
              <span>The Bamboo Woods Story</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl text-charcoal font-bold mb-6"
            >
              Where Nature Meets <span className="text-gold">Hospitality</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto"
            >
              We are more than just a restaurant. We are a sanctuary where great food, 
              family fun, and the serenity of nature come together.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-elevated h-[500px]"
            >
              <img 
                src={aboutImage} 
                alt="Our Story" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/20 to-transparent" />
            </motion.div>
            
            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl font-bold text-charcoal">A Sanctuary in the Woods</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Bamboo Woods was born from a desire to create a space where guests could disconnect from 
                the noise of the city and reconnect with themselves and their loved ones.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                What started as a small garden project has grown into a premier destination. 
                Whether you are racing cars in our kids' zone or enjoying a steak in our gazebo, 
                we believe that true luxury lies in simplicity and the warmth of a genuine welcome.
              </p>
              
              <div className="pt-6">
                <div className="bg-white border-l-4 border-gold p-6 shadow-sm rounded-r-xl">
                  <p className="italic text-charcoal font-medium text-lg">
                    "Our mission is to provide an escape that feels like home—only with better food and no dishes to wash."
                  </p>
                  <p className="text-gold font-bold mt-2 text-sm uppercase tracking-widest">— The Management</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-charcoal">Our Core Values</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm mx-auto text-gold">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-charcoal mb-3 text-center">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;