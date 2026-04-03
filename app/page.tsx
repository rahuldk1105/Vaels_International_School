import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyVaelsSection from '@/components/WhyVaelsSection';
import AcademicExcellenceSection from '@/components/AcademicExcellenceSection';
import CampusExperienceSection from '@/components/CampusExperienceSection';
import SocialProofSection from '@/components/SocialProofSection';
import GlobalOutcomesSection from '@/components/GlobalOutcomesSection';
import CTASection from '@/components/CTASection';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export default function Home() {
  return (
    <main>
      <ScrollProgressBar />
      <Navbar />
      <HeroSection />
      <div className="section-sep" />
      <AboutSection />
      <div className="section-sep" />
      <WhyVaelsSection />
      <div className="section-sep" />
      <AcademicExcellenceSection />
      <div className="section-sep" />
      <CampusExperienceSection />
      <SocialProofSection />
      <GlobalOutcomesSection />
      <CTASection />
    </main>
  );
}
