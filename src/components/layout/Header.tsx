import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setIsMenuOpen(false);

    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = isMobile ? 60 : 80; // Mobile: 50px, Desktop: 80px to prevent cropping
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const navItems = [
    { name: 'Beranda', href: 'home' },
    { name: 'Jadwal Sholat', href: 'prayer-times' },
    { name: 'Kegiatan', href: 'programs' },
    { name: 'Donasi', href: 'donations' },
    { name: 'Galeri', href: 'gallery' },
    { name: 'Kontak', href: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft navbar-pattern"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0"
          >
            <img
              src="/image/logo.png"
              alt="Musholla Al-Amin Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="font-heading font-bold text-lg text-foreground">Musholla</h1>
              <p className="text-xs text-muted-foreground">Al - Amin</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-foreground hover:text-mosque-accent transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mosque-accent transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </nav>

          {/* Quick Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
            </div>
            <Button className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground">
              Donasi
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-mosque-secondary transition-colors flex-shrink-0 mr-4"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="block w-full text-left py-3 px-2 text-foreground hover:text-mosque-accent hover:bg-mosque-secondary/50 transition-colors rounded-lg"
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navItems.length }}
                className="pt-4 border-t border-border"
              >
                <Button className="w-full bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground">
                  Donasi Sekarang
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;