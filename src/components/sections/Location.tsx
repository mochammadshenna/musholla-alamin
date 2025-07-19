import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Location = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const api_key_maps = "AIzaSyCQ_UXnAvkuocTR0GpB2AKFM93bLZGTQuA";
    // Initialize Google Maps
    const initMap = () => {
      if (mapRef.current && (window as any).google) {
        const mushollaLocation = { lat: -6.3945, lng: 106.8227 }; // Approximate coordinates for Depok Baktijaya

        const map = new (window as any).google.maps.Map(mapRef.current, {
          zoom: 16,
          center: mushollaLocation,
          styles: [
            {
              "featureType": "poi.place_of_worship",
              "elementType": "geometry",
              "stylers": [{ "color": "#d4af37" }]
            },
            {
              "featureType": "poi.place_of_worship",
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#d4af37" }]
            }
          ]
        });

        // Add marker
        const marker = new (window as any).google.maps.Marker({
          position: mushollaLocation,
          map: map,
          title: 'Musholla Al-Amin',
          icon: {
            path: (window as any).google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#d4af37',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Add info window
        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; font-family: Arial, sans-serif;">
              <h3 style="margin: 0 0 10px 0; color: #d4af37;">Musholla Al-Amin</h3>
              <p style="margin: 0; font-size: 14px;">Jl. Kp. Sugutamu, RT.02/RW.021<br>Bakti Jaya, Kec. Sukmajaya<br>Kota Depok, Jawa Barat</p>
            </div>
          `
        });

        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    };

    // Load Google Maps script (Note: Replace YOUR_API_KEY with actual Google Maps API key)
    if (typeof window !== 'undefined' && !(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key_maps}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if ((window as any).google) {
      initMap();
    }
  }, []);

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-background to-mosque-secondary/30 relative overflow-hidden">
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
            Lokasi Musholla
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kunjungi kami di lokasi yang mudah dijangkau
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-gradient-card border-mosque-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-mosque-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-mosque-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Alamat Lengkap</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Jl. Kp. Sugutamu, RT.02/RW.021<br />
                    Bakti Jaya, Kec. Sukmajaya<br />
                    Kota Depok, Jawa Barat
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-mosque-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-mosque-accent/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-mosque-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Kontak</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Telepon: (021) 123-4567</p>
                    <p>WhatsApp: +62 812-3456-7890</p>
                    <p>Email: info@mushollaalamin.id</p>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              className="w-full bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground"
              size="lg"
              onClick={() => window.open('https://maps.app.goo.gl/njoGKKLYGj6RzibA9', '_blank')}
            >
              <Navigation className="w-5 h-5 mr-2" />
              Buka di Google Maps
            </Button>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden border-mosque-primary/20">
              <div
                ref={mapRef}
                className="w-full h-96 lg:h-full min-h-[400px] bg-muted"
              >
                {/* Fallback if Google Maps doesn't load */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-mosque-accent mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading map...</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;