import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventsSection";
import VenueSection from "@/components/VenueSection";
import DiningSection from "@/components/DiningSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import AccommodationNotice from "@/components/AccommodationNotice";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <EventsSection />
        <VenueSection />
        <DiningSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <BookingForm />
        <AccommodationNotice />
      </main>
      <Footer />
    </div>
  );
};

export default Index;