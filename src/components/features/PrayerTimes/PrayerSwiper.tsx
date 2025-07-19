import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import PrayerCard from './PrayerCard';

interface Prayer {
  name: string;
  arabic: string;
  time: string;
  key: string;
}

interface PrayerSwiperProps {
  prayers: Prayer[];
  currentPrayer: string;
  nextPrayer: { name: string; time: string };
}

const PrayerSwiper = ({ prayers, currentPrayer, nextPrayer }: PrayerSwiperProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    slidesToScroll: 1,
  });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Auto scroll to current prayer (index 0 since it's reordered to be first)
  useEffect(() => {
    if (emblaApi) {
      scrollTo(0);
    }
  }, [emblaApi, scrollTo]);

  return (
    <div className="relative">
      {/* Swipe Instructions */}
      <div className="text-center mb-3 md:mb-4">
        <div className="inline-flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          <span>Geser untuk melihat jadwal sholat lainnya</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-2 md:gap-4">
          {prayers.map((prayer, index) => (
            <div key={`${prayer.name}-${index}`} className="embla__slide flex-[0_0_240px] md:flex-[0_0_280px] min-w-0">
              <PrayerCard
                prayer={prayer}
                index={index}
                isCurrent={currentPrayer === prayer.key}
                isNext={nextPrayer.name === prayer.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerSwiper;