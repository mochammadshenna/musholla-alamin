import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';

interface PrayerCardProps {
  prayer: {
    name: string;
    arabic: string;
    time: string;
    key: string;
  };
  index: number;
  isCurrent: boolean;
  isNext: boolean;
}

const PrayerCard = ({ prayer, index, isCurrent, isNext }: PrayerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative ${isCurrent ? 'z-10' : ''}`}
    >
      <Card className={`
        p-4 md:p-6 text-center transition-all duration-300 relative overflow-hidden h-full min-h-[160px] md:min-h-[200px] flex flex-col justify-center rounded-lg
        ${isCurrent
          ? 'bg-gradient-prayer border-mosque-accent shadow-prayer prayer-highlight'
          : isNext
            ? 'bg-mosque-gold/10 border-mosque-gold/30 shadow-soft'
            : 'bg-gradient-card border-mosque-primary/20 hover:border-mosque-primary/40 shadow-soft hover:shadow-prayer/50'
        }
      `}>
        {/* Current Prayer Indicator */}
        {isCurrent && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2"
          >
            <div className="bg-mosque-gold/20 rounded-full p-1">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-mosque-gold fill-mosque-gold" />
            </div>
          </motion.div>
        )}

        {/* Next Prayer Indicator */}
        {isNext && !isCurrent && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 right-2"
          >
            <div className="bg-mosque-gold/20 rounded-full p-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-mosque-gold" />
            </div>
          </motion.div>
        )}

        {/* Prayer Name */}
        <motion.h3
          className={`text-sm md:text-lg font-semibold mb-1 md:mb-2 ${isCurrent ? 'text-foreground' : 'text-foreground'
            }`}
          whileHover={{ scale: 1.05 }}
        >
          {prayer.name}
        </motion.h3>

        {/* Arabic Name */}
        <p className={`font-arabic text-lg md:text-2xl mb-2 md:mb-4 ${isCurrent ? 'text-mosque-accent' : 'text-mosque-accent/50'
          }`}>
          {prayer.arabic}
        </p>

        {/* Prayer Time */}
        <motion.div
          className={`text-xl md:text-3xl font-bold ${isCurrent ? 'text-foreground' : 'text-mosque-gold'
            }`}
          whileHover={{ scale: 1.1 }}
        >
          {prayer.time}
        </motion.div>

        {/* Status Text */}
        {isCurrent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-mosque-accent text-xs md:text-sm mt-1 md:mt-2 font-medium"
          >
            Sedang Berlangsung
          </motion.p>
        )}

        {isNext && !isCurrent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-mosque-gold text-xs md:text-sm mt-1 md:mt-2 font-medium"
          >
            Selanjutnya
          </motion.p>
        )}

        {/* Background Pattern for Current Prayer */}
        {isCurrent && (
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-white/5 rounded-lg"></div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default PrayerCard;