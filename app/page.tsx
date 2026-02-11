import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ArohaRules from "@/components/ArohaRules";
import JhalakEvents from "@/components/JhalakEvents";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white overflow-hidden selection:bg-[#BA170D] selection:text-white">
      <Navbar />
      <Hero />
      <About />

      {/* Event Rules */}
      <ArohaRules />

      {/* Internal Events */}
      <JhalakEvents />

      <Footer />
    </main>
  );
}
