import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import AboutSection from '@/components/AboutSection';
import OurFacilitiesSection from '@/components/OurFacilitiesSection';
import WhyVaelsSection from '@/components/WhyVaelsSection';
import AcademicExcellenceSection from '@/components/AcademicExcellenceSection';
import OurAcademicsSection from '@/components/OurAcademicsSection';
import OurAlumniSection from '@/components/OurAlumniSection';
import StudentsLifeSection from '@/components/StudentsLifeSection';
import SocialProofSection from '@/components/SocialProofSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LuxuryCursor from '@/components/LuxuryCursor';
import PageLoadOverlay from '@/components/PageLoadOverlay';
import MarqueeStrip from '@/components/MarqueeStrip';
import TopBar from '@/components/TopBar';

export default function Home() {
  return (
    <main>
      <PageLoadOverlay />
      <LuxuryCursor />
      <ScrollProgressBar />
      <TopBar />
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <div className="section-sep" />
      <AboutUsSection />
      <div className="section-sep" />
      <AboutSection />
      <div className="section-sep" />
      <OurFacilitiesSection />
      <div className="section-sep" />
      <WhyVaelsSection />
      <AcademicExcellenceSection />
      <div className="section-sep" />
      <OurAcademicsSection />
      <OurAlumniSection />
      <div className="section-sep" />
      <StudentsLifeSection />
      <SocialProofSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
