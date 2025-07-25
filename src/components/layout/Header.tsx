import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQRISModal, setShowQRISModal] = useState(false);
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when pressing Escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleDonationClick = () => {
    setShowQRISModal(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const handleCloseModal = () => {
    setShowQRISModal(false);
  };

  const handleLogoClick = () => {
    // console.log('Logo clicked! Navigating to home...');
    // Scroll to top of the page instead of navigating
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu first
    setIsMenuOpen(false);

    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      // Map navigation hrefs to actual section IDs
      let actualSectionId = sectionId;
      if (sectionId === 'quran') {
        actualSectionId = 'quran-section';
      }

      const element = document.getElementById(actualSectionId);
      if (element) {
        let headerHeight = isMobile ? 60 : 80; // Mobile: 60px, Desktop: 80px for proper fit

        // Special handling for gallery section on mobile
        if (sectionId === 'gallery' && isMobile) {
          headerHeight = 80; // Extra offset for gallery to ensure proper fit
        }

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
    { name: 'Al-Qur\'an', href: 'quran' },
    { name: 'Donasi', href: 'donations' },
    { name: 'Galeri', href: 'gallery' },
    { name: 'Kontak', href: 'contact' },
  ];

  return (
    <>
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
              className="flex items-center space-x-3 flex-shrink-0 cursor-pointer select-none"
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
            >
              <img
                src="/image/logo.png"
                alt="Musholla Al-Amin Logo"
                className="w-10 h-10 object-contain pointer-events-none"
              />
              <div className="pointer-events-none">
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
              <Button
                onClick={handleDonationClick}
                className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground"
              >
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
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-background border-t border-border relative z-50"
                ref={menuRef}
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
                    <Button
                      onClick={handleDonationClick}
                      className="w-full bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground"
                    >
                      Donasi Sekarang
                    </Button>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* QRIS Modal */}
      {showQRISModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-md w-full">
            <div className="relative bg-white rounded-lg p-6">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
              <img
                src="/image/qris.png"
                alt="QRIS QR Code"
                className="w-full h-auto blur-sm"
              // TODO: Remove blur-sm when you have a real QRIS code
              // className="w-full h-auto"
              />
              <p className="text-center text-sm text-gray-600 mt-4">
                QRIS Code untuk Donasi
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;