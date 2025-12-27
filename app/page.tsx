import Footer from "@/components/layout/Footer";
import MainNav from "@/components/navigation/MainNav";
import ContactSection from "@/components/sections/Contact";
import HeroSection from "@/components/sections/Hero";
import TechStackPage from "@/components/sections/Skills";
import WorkExperience from "@/components/sections/WorkExperience";

export default function Home() {
  return (
    <>

      <MainNav />
      <HeroSection />
      <TechStackPage />
      <WorkExperience />
      <ContactSection />
      <Footer />


    </>
  );
}
