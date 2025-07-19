import { motion } from 'framer-motion';
import { Clock, Globe, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { name: 'Beranda', href: 'home' },
    { name: 'Profil', href: 'about' },
    { name: 'Program', href: 'programs' },
    { name: 'Jadwal Sholat', href: 'prayer-times' },
    { name: 'Donasi', href: 'donations' },
    { name: 'Kontak', href: 'contact' },
  ];

  const programs = [
    { name: 'TPA Al-Amin', href: 'tpa-al-amin' },
    { name: 'Kajian Ahad', href: 'kajian-ahad' },
    { name: 'Santunan Anak Yatim', href: 'santunan-anak-yatim' },
    { name: 'Tahsin Al-Qur\'an', href: "tahsin-al-qur'an" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-mosque-primary rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-mosque-accent rounded-sm"></div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Musholla</h3>
                <p className="text-sm text-background/80">Al - Amin</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed mb-4">
              Musholla Al-Amin Baktijaya Sukmajaya Depok.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-mosque-accent transition-colors"
              >
                <Globe className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-mosque-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-mosque-accent transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6">Menu Utama</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/80 hover:text-mosque-accent transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div> */}

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6">Program Kami</h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={program.name}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(program.href)}
                    className="text-background/80 hover:text-mosque-accent transition-colors text-sm text-left w-full"
                  >
                    {program.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4 className="font-heading font-bold text-lg mb-6">Kontak & Lokasi</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-mosque-accent mt-0.5 flex-shrink-0" />
                <p className="text-background/80 text-sm">
                  Jl. Kp. Sugutamu, RT.02/RW.021, Bakti Jaya, Kec. Sukmajaya<br />
                  Kota Depok, Jawa Barat 16418
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-mosque-accent flex-shrink-0" />
                <p className="text-background/80 text-sm">+62 21 8765 4321</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-mosque-accent flex-shrink-0" />
                <p className="text-background/80 text-sm">info@musholla-alamin.id</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-mosque-accent mt-0.5 flex-shrink-0" />
                <div className="text-background/80 text-sm">
                  <p>Senin - Minggu</p>
                  <p>04:00 - 20:00 WIB</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-background/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm mb-4 md:mb-0">
              © 2024 Musholla Al-Amin. Semua hak cipta dilindungi.
            </p>
            <div className="text-background/60 text-sm">
              <span>Dibuat dengan </span>
              <span className="text-mosque-accent">❤️</span>
              <span> untuk umat</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;