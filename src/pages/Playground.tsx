import Navbar from "@/components/Navbar";
import PlaygroundSection from "@/components/PlaygroundSection";
import Footer from "@/components/Footer";

const Playground = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        <PlaygroundSection />
      </main>
      <Footer />
    </div>
  );
};

export default Playground;
