import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const DonationContainer = () => {
  const isMobile = useIsMobile();

  return (
    <section id="donations" className="py-16 bg-mosque-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Donasi Infaq
          </h2>
        </div>

        {/* Main Content */}
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-8' : 'lg:grid-cols-2 gap-2'} items-center`}>
          {/* QRIS Image */}
          <div className="flex justify-center lg:justify-start">
            <Card className={`${isMobile ? 'p-6' : 'p-8'} bg-white shadow-soft`}>
              <img
                src="/image/qris.png"
                alt="QRIS QR Code"
                className="w-full max-w-md mx-auto blur-sm"
              />
            </Card>
          </div>

          {/* Text Content */}
          <div className={`space-y-4 ${isMobile ? '' : 'lg:-ml-8'}`}>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Musholla Al-Amin menyediakan fasilitas Infaq bagi Jama'ah Masjid dengan menggunakan QRIS, disamping fasilitas kotak infaq yang sudah tersedia terlebih dahulu.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Infaq melalui QRIS / QR Scan di Musholla Al-Amin adalah berinfaq dengan metode Scan Barcode dan pembayarannya melalui payment getawey seperti OVO, Gopay, Shopee Pay, Link Aja, Dana dan juga melalui Mobile Banking Jama'ah.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Semakin mudah berinfaq dan beribadah di Musholla Al-Amin.
              </p>
            </div>

            <div className="pt-4">
              <Button className="bg-mosque-accent hover:bg-mosque-accent/90 text-mosque-accent-foreground px-8 py-3">
                Donasi Sekarang
              </Button>
            </div>
          </div>
        </div>

        {/* Donation Methods */}
        <div className="text-center mt-8">
          <Card className="inline-block bg-mosque-accent/5 border-mosque-accent/20 p-6">
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">
              Cara Berdonasi
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-mosque-green/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <span className="text-mosque-green font-bold text-xs md:text-sm">1</span>
                </div>
                <p className="font-medium text-xs md:text-sm">Transfer Bank</p>
                <p className="text-muted-foreground text-xs">BSI: 1234567890</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-mosque-accent/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <span className="text-mosque-accent font-bold text-xs md:text-sm">2</span>
                </div>
                <p className="font-medium text-xs md:text-sm">E-Wallet</p>
                <p className="text-muted-foreground text-xs">Dana, OVO, Gopay</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-mosque-gold/10 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <span className="text-mosque-gold font-bold text-xs md:text-sm">3</span>
                </div>
                <p className="font-medium text-xs md:text-sm">Langsung</p>
                <p className="text-muted-foreground text-xs">Kotak amal musholla</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              "Perumpamaan (nafkah yang dikeluarkan) di jalan Allah adalah serupa dengan sebutir benih yang menumbuhkan tujuh bulir"
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DonationContainer;