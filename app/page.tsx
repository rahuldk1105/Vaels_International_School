import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import WhyVaelsSection from '@/components/WhyVaelsSection';
import AcademicExcellenceSection from '@/components/AcademicExcellenceSection';
import CampusExperienceSection from '@/components/CampusExperienceSection';
import SocialProofSection from '@/components/SocialProofSection';
import GlobalOutcomesSection from '@/components/GlobalOutcomesSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyVaelsSection />
      <AcademicExcellenceSection />
      <CampusExperienceSection />
      <SocialProofSection />
      <GlobalOutcomesSection />
      <CTASection />
    </main>
  );
}
