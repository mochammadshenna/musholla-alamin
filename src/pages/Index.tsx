import Hero from '@/components/common/Hero';
import DonationContainer from '@/components/features/Donations/DonationContainer';
import PrayerTimesContainer from '@/components/features/PrayerTimes/PrayerTimesContainer';
import ProgramsGrid from '@/components/features/Programs/ProgramsGrid';
import { QuranContainer } from '@/components/features/Quran/QuranContainer';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/sections/Location';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  // Handle scroll to Quran section when coming back from Quran List
  useEffect(() => {
    if (location.state?.scrollTo === 'quran-section') {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        const quranSection = document.getElementById('quran-section');
        if (quranSection) {
          quranSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <PrayerTimesContainer />
        <ProgramsGrid />
        <div id="quran-section">
          <QuranContainer />
        </div>
        <DonationContainer />
        <Gallery />
        <Location />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
