import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const Gallery = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    duration: 20,
    startIndex: 0
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollToSlide = useCallback(
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

  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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
            className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                onClick={() => setSelectedImage(image)}
              >
                <Eye className="w-4 h-4" />
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

        <div className="p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-mosque-accent transition-colors">
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
    <section id="gallery" className="py-16 pb-16 bg-gradient-to-br from-mosque-secondary/30 to-background relative overflow-hidden">
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
            Galeri
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dokumentasi kegiatan yang tersedia di Musholla Al-Amin
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
                  onClick={() => scrollToSlide(index)}
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

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setSelectedImage(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full w-full h-full">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {selectedImage.description}
                  </p>
                  <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 backdrop-blur-sm">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;