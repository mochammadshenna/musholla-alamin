import Hero from '@/components/common/Hero';
import DonationContainer from '@/components/features/Donations/DonationContainer';
import PrayerTimesContainer from '@/components/features/PrayerTimes/PrayerTimesContainer';
import ProgramsGrid from '@/components/features/Programs/ProgramsGrid';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/sections/Location';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <PrayerTimesContainer />
        <ProgramsGrid />
        <DonationContainer />
        <Gallery />
        <Location />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
