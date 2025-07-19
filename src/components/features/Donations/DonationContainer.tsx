import { motion } from 'framer-motion';
import { Heart, Building, Utensils, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const DonationContainer = () => {
  const donationCauses = [
    {
      title: 'Bantu Korban Gempa Turki - Suriah',
      description: 'Bantuan kemanusiaan untuk korban gempa bumi yang melanda Turki dan Suriah',
      raised: 85000000,
      target: 100000000,
      icon: Heart,
      color: 'red-500',
      urgency: 'Mendesak',
    },
    {
      title: 'Renovasi Musholla',
      description: 'Dana untuk renovasi dan pengembangan fasilitas musholla yang lebih nyaman',
      raised: 45000000,
      target: 75000000,
      icon: Building,
      color: 'blue-500',
      urgency: 'Penting',
    },
    {
      title: 'Program Makan Gratis',
      description: 'Menyediakan makanan gratis untuk dhuafa dan anak yatim setiap hari Jumat',
      raised: 12000000,
      target: 20000000,
      icon: Utensils,
      color: 'green-500',
      urgency: 'Berkelanjutan',
    },
    {
      title: 'Beasiswa Pendidikan',
      description: 'Bantuan biaya pendidikan untuk anak-anak kurang mampu berprestasi',
      raised: 30000000,
      target: 50000000,
      icon: GraduationCap,
      color: 'purple-500',
      urgency: 'Tahun Ajaran Baru',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, target: number) => {
    return (raised / target) * 100;
  };

  return (
    <section id="donations" className="py-16 bg-mosque-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Donasi Infaq
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Salurkan kebaikan Anda melalui berbagai program donasi yang telah kami siapkan
          </p>
          <div className="inline-flex items-center gap-2 bg-mosque-accent/10 border border-mosque-accent/20 rounded-full px-6 py-2">
            <Heart className="w-5 h-5 text-mosque-accent" />
            <span className="text-mosque-accent font-semibold">Sedekah Jariyah</span>
          </div>
        </motion.div>

        {/* Donation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {donationCauses.map((cause, index) => (
            <motion.div
              key={cause.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 h-full bg-gradient-card border-mosque-primary/20 hover:border-mosque-accent/30 shadow-soft hover:shadow-prayer transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-lg bg-${cause.color}/10 flex items-center justify-center`}
                  >
                    <cause.icon className={`w-6 h-6 text-${cause.color}`} />
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${cause.color}/10 text-${cause.color}`}>
                    {cause.urgency}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-mosque-accent transition-colors">
                  {cause.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {cause.description}
                </p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(cause.raised)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Target: {formatCurrency(cause.target)}
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(cause.raised, cause.target)} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {getProgressPercentage(cause.raised, cause.target).toFixed(1)}% tercapai
                  </p>
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground group-hover:shadow-glow transition-all duration-300"
                >
                  Donasi Sekarang
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Donation Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Card className="inline-block bg-mosque-accent/5 border-mosque-accent/20 p-8">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4">
              Cara Berdonasi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-mosque-green/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-mosque-green font-bold">1</span>
                </div>
                <p className="font-medium">Transfer Bank</p>
                <p className="text-muted-foreground">BSI: 1234567890</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mosque-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-mosque-accent font-bold">2</span>
                </div>
                <p className="font-medium">E-Wallet</p>
                <p className="text-muted-foreground">Dana, OVO, Gopay</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-mosque-gold/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-mosque-gold font-bold">3</span>
                </div>
                <p className="font-medium">Langsung</p>
                <p className="text-muted-foreground">Kotak amal musholla</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              "Perumpamaan (nafkah yang dikeluarkan) di jalan Allah adalah serupa dengan sebutir benih yang menumbuhkan tujuh bulir"
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationContainer;