import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#dining", label: "Restaurant" },
    { href: "#venue", label: "Spaces" },
    { href: "#events", label: "Events" },
    { href: "#why-us", label: "Why Us" },
    { href: "#testimonials", label: "Reviews" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-lg border-b border-gold/10"
          : "bg-gradient-to-b from-black/40 via-black/20 to-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          {/* Logo Section */}
          <motion.a
            href="#"
            className="relative z-20 flex items-center h-full py-3 md:py-4"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative h-[240%] -my-12 md:h-[260%] md:-my-14 w-auto flex items-center">
              <img
                src="/src/assets/bambooLogo.png"
                alt="Bamboo Woods Logo"
                className="h-full w-auto object-contain drop-shadow-2xl"
                style={{ 
                  filter: isScrolled 
                    ? 'drop-shadow(0 4px 12px rgba(184, 134, 11, 0.3))' 
                    : 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))'
                }}
              />
            </div>
            <span className="sr-only">Bamboo Woods</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative text-base xl:text-lg font-medium tracking-wide transition-all duration-300 group ${
                  isScrolled
                    ? "text-charcoal/80 hover:text-gold"
                    : "text-white/90 hover:text-gold"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection("#booking")}
                className="px-8 py-6 text-base xl:text-lg font-semibold bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Make a Reservation
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`lg:hidden z-20 p-2 rounded-lg transition-all duration-300 ${
              isScrolled
                ? "text-charcoal hover:bg-gold/10"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={32} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={32} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div 
                className="py-6 space-y-4 bg-white/95 backdrop-blur-lg rounded-2xl my-4 px-6 shadow-xl border border-gold/20"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block w-full text-left text-lg font-medium text-charcoal/80 hover:text-gold hover:translate-x-2 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gold/5"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => scrollToSection("#booking")}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-gold to-amber-600 hover:from-amber-600 hover:to-gold shadow-lg"
                  >
                    Make a Reservation
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;