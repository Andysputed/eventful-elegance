import { motion } from "framer-motion";
import { Cake, Baby, Briefcase, GraduationCap, Users, PartyPopper } from "lucide-react";
import birthdayImage from "@/assets/birthday-event.jpg";
import babyshowerImage from "@/assets/babyshower-event.jpg";
import corporateImage from "@/assets/corporate-event.jpg";
import graduationImage from "@/assets/graduation-event.jpg";
import weddingImage from "@/assets/wedding-event.jpg";

const events = [
  {
    icon: Cake,
    title: "Birthday Parties",
    description: "Celebrate another year with a memorable birthday gathering in our charming venue.",
    image: birthdayImage,
  },
  {
    icon: Baby,
    title: "Baby Showers",
    description: "Welcome new life with a beautifully styled celebration in our garden setting.",
    image: babyshowerImage,
  },
  {
    icon: Briefcase,
    title: "Corporate Meetings",
    description: "Professional meeting rooms perfect for business discussions and small conferences.",
    image: corporateImage,
  },
  {
    icon: GraduationCap,
    title: "Graduation Parties",
    description: "Honor academic achievements with an intimate celebration for family and friends.",
    image: graduationImage,
  },
  {
    icon: PartyPopper,
    title: "Intimate Weddings",
    description: "Say 'I do' in our cozy venue—ideal for small, heartfelt wedding celebrations.",
    image: weddingImage,
  },
  {
    icon: Users,
    title: "Private Functions",
    description: "From anniversaries to reunions, we host all your special gatherings.",
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
            Celebrate With Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-charcoal font-bold mt-3 mb-4">
            Events & Gatherings
          </h2>
          <p className="text-muted-foreground text-lg">
            Beyond dining, Bamboo Woods is the perfect spot for intimate celebrations
            and private events with up to 100 guests.
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
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-gold/90 rounded-lg flex items-center justify-center">
                      <event.icon className="w-5 h-5 text-cream" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-xl text-charcoal font-semibold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
