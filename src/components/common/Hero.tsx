import heroImage from '@/assets/hero-mosque.jpg';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const isMobile = useIsMobile();

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('prayer-times');
    if (nextSection) {
      const headerHeight = isMobile ? 60 : 80; // Same offset as header navigation
      const elementPosition = nextSection.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const donation = () => {
    const nextSection = document.getElementById('donations');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-10"></div>
        <img
          src={heroImage}
          alt="Beautiful Mosque Architecture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Islamic Pattern Overlay */}
      {/* <div className="absolute inset-0 islamic-pattern z-20"></div> */}

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-30 text-center text-white max-w-4xl mx-auto px-4"
      >
        {/* Islamic Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          {/* <p className="text-mosque-gold font-arabic text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <p className="text-white/80 text-lg">Assalamu'alaikum Warahmatullahi Wabarakatuh</p> */}
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight"
        >
          <span className="block text-mosque-gold">Musholla Al-Amin</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Baktijaya Sukmajaya Depok
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToNextSection}
            size="lg"
            className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground px-8 py-3 text-lg font-semibold shadow-prayer hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
          >
            Lihat Jadwal Sholat
          </Button>
          <Button
            onClick={donation}
            size="lg"
            className="bg-white text-orange-400 hover:bg-white/90 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
          >
            Donasi
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center mx-auto"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Remove the old scroll indicator */}
    </section>
  );
};

export default Hero;