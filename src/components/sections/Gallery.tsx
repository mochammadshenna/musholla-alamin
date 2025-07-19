import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Eye, Share2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const Gallery = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    duration: 10,
    startIndex: 0
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const galleryImages = [
    {
      id: 1,
      src: '/image/kurban-1.png',
      title: 'Suasana Kurban',
      description: 'Kegiatan kurban Idul Adha di musholla Al-Amin bersama jamaah',
      category: 'Kegiatan Kurban'
    },
    {
      id: 2,
      src: '/image/kurban-2.jpeg',
      title: 'Suasana Kurban',
      description: 'Kegiatan kurban Idul Adha di musholla Al-Amin bersama jamaah',
      category: 'Kegiatan Kurban'
    },
    {
      id: 3,
      src: '/image/kurban-3.jpeg',
      title: 'Suasana Kurban',
      description: 'Kegiatan kurban Idul Adha di musholla Al-Amin bersama jamaah',
      category: 'Kegiatan Kurban'
    },
    {
      id: 4,
      src: '/image/kurban-4.jpeg',
      title: 'Suasana Kurban',
      description: 'Kegiatan kurban Idul Adha di musholla Al-Amin bersama jamaah',
      category: 'Kegiatan Kurban'
    },
    {
      id: 5,
      src: '/image/ngaji-1.png',
      title: 'Suasana Pengajian',
      description: 'Suasana khusyuk jamaah saat mendengarkan kajian dari ustadz di musholla',
      category: 'Kegiatan Pengajian'
    },
    {
      id: 6,
      src: '/image/ngaji-2.jpeg',
      title: 'Suasana Pengajian',
      description: 'Suasana khusyuk jamaah saat mendengarkan kajian dari ustadz di musholla',
      category: 'Kegiatan Pengajian'
    }
  ];

  const GalleryCard = ({ image, index }: { image: typeof galleryImages[0], index: number }) => (
    <div
      className={isMobile ? "flex-[0_0_85%] min-w-0 mr-4" : ""}
    >
      <Card className="group overflow-hidden bg-gradient-card border-mosque-primary/20 hover:border-mosque-accent/50 transition-all duration-500 hover:shadow-prayer h-full">
        <div className="relative overflow-hidden">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 text-mosque-accent px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm border border-mosque-accent/30">
              {image.category}
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-mosque-accent transition-colors">
            {image.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {image.description}
          </p>
        </div>
      </Card>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-mosque-secondary/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="islamic-pattern"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Galeri Musholla Al-Amin
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dokumentasi kegiatan yang tersedia di musholla kami
          </p>
        </motion.div>

        {/* Mobile Swiper */}
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {galleryImages.map((image, index) => (
                  <GalleryCard key={image.id} image={image} index={index} />
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                    ? 'bg-mosque-accent w-6'
                    : 'bg-mosque-accent/30'
                    }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} />
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground px-8"
          >
            Lihat Semua Galeri
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;