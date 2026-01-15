import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DiningSection from "@/components/DiningSection";
import VenueSection from "@/components/VenueSection";
import EventsSection from "@/components/EventsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingForm from "@/components/BookingForm";
import AccommodationNotice from "@/components/AccommodationNotice";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <DiningSection />
        <VenueSection />
        <EventsSection />
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