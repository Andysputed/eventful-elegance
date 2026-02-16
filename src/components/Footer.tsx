import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Lock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/menu", label: "Menu" },
    { to: "/playground", label: "Playground" },
    { to: "/#events", label: "Events" },
    { to: "/#booking", label: "Reservations" },
  ];

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to="/" className="font-display text-2xl font-bold inline-block mb-4">
              <span className="text-gold">Bamboo</span>Woods
            </Link>
            <p className="text-cream/70 mb-6 leading-relaxed">
              A charming restaurant with beautiful spaces for dining, gatherings, and intimate celebrations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100087870349678"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/bamboo_woods_garden?igsh=ZWFxMjVnd3ZpdGls"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream/70 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold mb-6">What We Offer</h4>
            <ul className="space-y-3">
              {[
                "Restaurant Dining",
                "Garden Gazebos",
                "Meeting Rooms",
                "Birthday Parties",
                "Baby Showers",
                "Private Functions",
              ].map((item) => (
                <li key={item}>
                  <span className="text-cream/70">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <span className="text-cream/70">
                  Nakuru-Marigat Road-(Simba Petrol Station) ,
                  <br />
                  Nakuru, Kenya 20100
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="tel:+254742776921" className="text-cream/70 hover:text-gold transition-colors">
                  +254 742-776-921
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a href="mailto:hello@bamboowoods.com" className="text-cream/70 hover:text-gold transition-colors">
                  hello@bamboowoods.com
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-cream/70">Mon - Sun: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-cream/50">
              <p>(c) {currentYear} Bamboo Woods. All rights reserved.</p>
              <div className="flex items-center gap-4 text-xs">
                <Link to="/privacy" className="text-cream/40 hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-cream/40 hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            <Link to="/admin-login" className="flex items-center gap-2 text-cream/30 hover:text-gold text-xs transition-colors">
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
