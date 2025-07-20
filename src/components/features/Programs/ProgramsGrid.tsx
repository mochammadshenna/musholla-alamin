import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Book, Heart, Users } from 'lucide-react';

const ProgramsGrid = () => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: true
  });
  const programs = [
    {
      title: 'TPQ Al-Amin',
      description: 'Program pendidikan Al-Qur\'an untuk anak-anak dengan metode pembelajaran yang menyenangkan dan interaktif.',
      icon: Book,
      color: 'mosque-green',
      features: ['Hafalan Juz Amma', 'Baca Tulis Al-Qur\'an', 'Akhlak Islami'],
      schedule: 'Senin - Kamis, 16:00 - 18:00',
    },
    {
      title: 'Kajian Ahad',
      description: 'Kajian rutin setiap hari Ahad membahas berbagai tema keislaman dengan ustadz berpengalaman.',
      icon: Users,
      color: 'mosque-accent',
      features: ['Tafsir Al-Qur\'an', 'Hadits Pilihan', 'Fiqh Sehari-hari'],
      schedule: 'Ahad, Ba\'da subuh Minggu ke 2 dan 4',
    },
    {
      title: 'Santunan Anak Yatim',
      description: 'Program santunan anak yatim dengan tujuan membantu anak-anak yang tidak memiliki keluarga.',
      icon: Heart,
      color: 'mosque-gold',
      features: ['Santunan Tunai', 'Santunan Sembako'],
      schedule: 'Setiap 3 bulan sekali',
    },
    {
      title: 'Tahsin Al-Qur\'an',
      description: 'Program perbaikan bacaan Al-Qur\'an untuk meningkatkan kualitas tilawah sesuai kaidah tajwid.',
      icon: Award,
      color: 'mosque-accent',
      features: ['Tajwid Dasar', 'Makharijul Huruf', 'Sifatul Huruf'],
      schedule: 'Ahad, Ba\'da subuh Minggu ke 2',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="py-16 bg-gradient-to-b from-mosque-primary/5 to-transparent">
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
            Program & Kegiatan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bergabunglah dengan berbagai program islami yang kami sediakan untuk meningkatkan
            kualitas iman dan taqwa seluruh keluarga
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              id={program.title.toLowerCase().replace(/\s+/g, '-')}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="p-8 h-full bg-gradient-card border-mosque-primary/20 hover:border-mosque-accent/30 shadow-soft hover:shadow-prayer transition-all duration-300">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl bg-${program.color}/10 flex items-center justify-center mb-6 group-hover:bg-${program.color}/20 transition-colors`}
                >
                  <program.icon className={`w-8 h-8 text-${program.color}`} />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-mosque-accent transition-colors">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Yang Dipelajari:</h4>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full bg-${program.color} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full bg-${program.color}/10 text-${program.color} text-sm font-medium`}>
                    {program.schedule}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => scrollToSection('gallery')}
                  variant="outline"
                  className="w-full group-hover:bg-mosque-accent group-hover:text-mosque-accent-foreground group-hover:border-mosque-accent transition-all duration-300"
                >
                  <span>Lihat Galeri</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="inline-block bg-mosque-accent/5 border-mosque-accent/20 p-8">
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              Butuh Informasi Lebih Lanjut?
            </h3>
            <p className="text-muted-foreground mb-6">
              Perihal Infaq, Shodaqoh dan Zakat serta program-program yang lainnya
            </p>
            {/* Button direct to whatsapp*/}
            <Button className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground" onClick={() => window.open('https://wa.me/6289681521978?text=Assalamualaikum%20wr.%20wb.%20DKM%20Musholla%20Al-Amin%2C%20saya%20ingin%20mengikuti%20program%20yang%20tersedia%20di%20Musholla%20Al-Amin', '_blank')}>
              Hubungi Kami <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsGrid;