import { motion } from "framer-motion";
import { Heart, Cake, Baby, Briefcase, GraduationCap, Users } from "lucide-react";
import weddingImage from "@/assets/wedding-event.jpg";
import birthdayImage from "@/assets/birthday-event.jpg";
import babyshowerImage from "@/assets/babyshower-event.jpg";
import corporateImage from "@/assets/corporate-event.jpg";
import graduationImage from "@/assets/graduation-event.jpg";

const events = [
  {
    icon: Heart,
    title: "Weddings",
    description: "Create the wedding of your dreams in our stunning outdoor venue with elegant tent setups and romantic ambiance.",
    image: weddingImage,
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    description: "Celebrate another year of life with unforgettable birthday celebrations for all ages.",
    image: birthdayImage,
  },
  {
    icon: Baby,
    title: "Baby Showers",
    description: "Welcome new life with beautifully styled baby showers in our picturesque garden setting.",
    image: babyshowerImage,
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description: "Host professional meetings, conferences, and team-building events in our dedicated spaces.",
    image: corporateImage,
  },
  {
    icon: GraduationCap,
    title: "Graduation Parties",
    description: "Honor academic achievements with memorable graduation celebrations.",
    image: graduationImage,
  },
  {
    icon: Users,
    title: "Private Functions",
    description: "From anniversaries to reunions, we cater to all your private celebration needs.",
    image: weddingImage,
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-gradient-hero">
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
            Our Specialties
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-4">
            Events We Host
          </h2>
          <p className="text-muted-foreground text-lg">
            From intimate gatherings to grand celebrations, we bring your vision to life
            with exceptional attention to detail.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-soft hover:shadow-elevated transition-shadow duration-300 bg-card">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-gold/90 rounded-lg flex items-center justify-center">
                      <event.icon className="w-6 h-6 text-cream" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl text-charcoal font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;