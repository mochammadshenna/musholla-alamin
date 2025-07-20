import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from '@/hooks/useLocation';
import { getActivePrayer, getCurrentPrayer, getMobilePrayerSequence, getNextPrayer, getNextPrayerForCountdown, usePrayerTimes } from '@/hooks/usePrayerTimes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PrayerCard from './PrayerCard';
import PrayerSwiper from './PrayerSwiper';

// Countdown Timer Component
const PrayerCountdown = ({ nextPrayer }: { nextPrayer: { name: string; time: string } }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = nextPrayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      // If prayer time has passed today, set it for tomorrow
      if (prayerTime <= now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const difference = prayerTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer.time]);

  return (
    <div className="flex items-center gap-3 md:gap-4 bg-mosque-accent/10 border border-mosque-accent/20 rounded-lg px-4 md:px-6 py-3 md:py-3 w-full md:w-auto md:inline-flex transition-all duration-300 ease-in-out h-12 md:h-14">
      {/* Bedug Icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <img
          src="/image/bedug.png"
          alt="Bedug"
          className="w-5 h-5 md:w-6 md:h-6 animate-pulse filter brightness-0 invert"
          style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(119%)' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-center md:text-left flex-1">
        <span className="font-semibold text-mosque-accent text-xs md:text-sm">
          {nextPrayer.name} pukul {nextPrayer.time}
        </span>
        <span className="text-mosque-accent/80 text-xs md:text-sm">
          Adzan akan segera dimulai dalam{' '}
          <span className="text-orange-600 inline-block min-w-[2ch] transition-all duration-300 ease-in-out">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          :<span className="text-orange-600 inline-block min-w-[2ch] transition-all duration-300 ease-in-out">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          :<span className="text-orange-600 inline-block min-w-[2ch] transition-all duration-300 ease-in-out">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
        </span>
      </div>
    </div>
  );
};

const PrayerTimesContainer = () => {
  const { location } = useLocation();
  const { data: prayerTimes, isLoading, error } = usePrayerTimes(location);
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mosque-primary mx-auto"></div>
          <p className="mt-2 text-mosque-primary">Memuat jadwal sholat...</p>
        </div>
      </div>
    );
  }

  if (error || !prayerTimes) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500">Gagal memuat jadwal sholat</p>
        </div>
      </div>
    );
  }

  // Use same logic for both mobile and desktop
  const currentPrayer = getCurrentPrayer(prayerTimes);
  const nextPrayer = getNextPrayer(prayerTimes);

  const prayers = [
    { name: 'Subuh', arabic: 'الفجر', time: prayerTimes.fajr, key: 'fajr' },
    { name: 'Dzuhur', arabic: 'الظهر', time: prayerTimes.dhuhr, key: 'dhuhr' },
    { name: 'Ashar', arabic: 'العصر', time: prayerTimes.asr, key: 'asr' },
    { name: 'Maghrib', arabic: 'المغرب', time: prayerTimes.maghrib, key: 'maghrib' },
    { name: 'Isya', arabic: 'العشاء', time: prayerTimes.isha, key: 'isha' },
  ];

  // Mobile-specific logic
  const activePrayer = getActivePrayer(prayerTimes);
  const nextPrayerForCountdown = getNextPrayerForCountdown(prayerTimes);

  // Determine mobile prayer sequence based on active prayer or countdown
  let mobilePrayers: Array<{ name: string; arabic: string; time: string; key: string }> = [];
  let showCountdown = false;
  let countdownPrayer = nextPrayerForCountdown;

  if (activePrayer) {
    // Scenario 1: Active prayer - show 5 cards starting from active prayer
    mobilePrayers = getMobilePrayerSequence(prayerTimes, activePrayer.key);
    showCountdown = false;
  } else {
    // Scenario 2: Countdown - show countdown + 5 cards starting from next prayer
    const nameToKeyMap: { [key: string]: string } = {
      'Subuh': 'fajr',
      'Dzuhur': 'dhuhr',
      'Ashar': 'asr',
      'Maghrib': 'maghrib',
      'Isya': 'isha'
    };
    const nextPrayerKey = nameToKeyMap[nextPrayerForCountdown.name];
    mobilePrayers = getMobilePrayerSequence(prayerTimes, nextPrayerKey);
    showCountdown = true;
    countdownPrayer = nextPrayerForCountdown;
  }

  return (
    <section id="prayer-times" className="py-16 md:py-24 bg-gradient-to-b from-mosque-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Jadwal Sholat Hari Ini
          </h2>
          <p className="text-orange-500 text-sm md:text-base">
            Musholla Al-Amin - Baktijaya, Depok
          </p>

          {/* Prayer Countdown - Hide when there's an active prayer */}
          {!activePrayer && (
            <div className="mt-4 md:mt-6">
              <PrayerCountdown nextPrayer={nextPrayer} />
            </div>
          )}
        </motion.div>

        {isMobile ? (
          <PrayerSwiper
            prayers={mobilePrayers}
            currentPrayer={activePrayer?.key || ''}
            nextPrayer={countdownPrayer}
            showCountdown={showCountdown}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {prayers.map((prayer, index) => (
              <PrayerCard
                key={prayer.key}
                prayer={prayer}
                index={index}
                isCurrent={prayer.name === nextPrayer.name}
                isNext={false}
                isDesktop={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PrayerTimesContainer;