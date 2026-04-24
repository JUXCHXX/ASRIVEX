import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import StackPlanet from "@/components/sections/StackPlanet";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

const LOADER_SESSION_KEY = "astrivex-loader-seen";

const hasSeenLoader = () => {
  if (typeof window === "undefined") return false;

  try {
    return window.sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

const Index = () => {
  const [loading, setLoading] = useState(() => !hasSeenLoader());

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      try {
        window.sessionStorage.setItem(LOADER_SESSION_KEY, "1");
      } catch {
        // Ignore storage failures and continue rendering normally.
      }

      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <main className="relative">
        <Navbar />
        <Hero />
        <Services />
        <StackPlanet />
        <Team />
        <Contact />
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
