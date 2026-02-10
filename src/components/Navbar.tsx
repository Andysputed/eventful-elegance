import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; 
import bambooLogo from '../assets/bamboo-logo.png';

const NAV_OFFSET = 96;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- UPDATED LINKS (Removed "Why Us") ---
  const navLinks = [
    { href: "#dining", label: "Restaurant" },
    { href: "#venue", label: "Spaces" },
    { href: "#events", label: "Events" },
    // { href: "#why-us", label: "Why Us" }, <--- REMOVED THIS LINE
    { href: "/about", label: "About Us", isRoute: true },
    { href: "/menu", label: "Menu", isRoute: true }, 
    { href: "#playground", label: "Playground" },
  ];

  const handleNavInteraction = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      navigate(href);
      setIsMobileMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(href);
      }, 100);
    } else {
      scrollToSection(href);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      NAV_OFFSET;

    const isMobile = window.innerWidth < 768;

    window.scrollTo({
      top: y,
      behavior: isMobile ? "auto" : "smooth",
    });

    if (isMobile) {
      setTimeout(() => setIsMobileMenuOpen(false), 200);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gold/10"
          : "bg-gradient-to-b from-black/40 via-black/20 to-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          
          <motion.a
            onClick={() => navigate("/")}
            className="relative z-20 flex items-center h-full py-1 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-auto" style={{ height: '200%' }}>
              <img
                 src={bambooLogo} 
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

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavInteraction(link.href, link.isRoute)}
                className={`text-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-charcoal/80 hover:text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                {link.label}
              </button>
            ))}

            <Button
              variant="hero"
              size="lg"
              onClick={() => handleNavInteraction("#booking")}
            >
              Make a Reservation
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? "text-charcoal" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-4 rounded-2xl bg-white/95 backdrop-blur-lg shadow-xl px-6 py-6 space-y-4">
                {navLinks.map(link => (
                  <button
                    key={link.href}
                    onClick={() => handleNavInteraction(link.href, link.isRoute)}
                    className="block w-full text-left text-lg font-medium text-charcoal/80 hover:text-gold py-3"
                  >
                    {link.label}
                  </button>
                ))}

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-4"
                  onClick={() => handleNavInteraction("#booking")}
                >
                  Make a Reservation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;