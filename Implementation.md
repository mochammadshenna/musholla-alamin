# Mosque Website - Implementation Guide

## Technology Stack

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Query** for API state management

### UI Components
- **Shadcn/ui** for consistent, accessible components
- **Lucide React** for beautiful, consistent icons
- **React Hook Form** for form management
- **Date-fns** for date manipulation and formatting

### APIs & Services
- **IslamicFinder API** for prayer times
- **Geolocation API** for location detection
- **Local Storage** for user preferences

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── features/           # Feature-specific components
│   │   ├── PrayerTimes/
│   │   ├── Programs/
│   │   ├── Donations/
│   │   └── Events/
│   └── common/             # Shared components
│       ├── Hero.tsx
│       ├── Card.tsx
│       └── Loading.tsx
├── hooks/                  # Custom React hooks
│   ├── usePrayerTimes.ts
│   ├── useLocation.ts
│   └── useLocalStorage.ts
├── services/               # API services
│   ├── prayerTimes.ts
│   └── api.ts
├── types/                  # TypeScript definitions
│   ├── prayer.ts
│   └── common.ts
├── utils/                  # Utility functions
│   ├── formatters.ts
│   ├── constants.ts
│   └── helpers.ts
├── assets/                 # Static assets
│   ├── images/
│   └── icons/
└── pages/                  # Page components
    ├── Home.tsx
    ├── Programs.tsx
    ├── About.tsx
    └── Contact.tsx
```

## Core Components Implementation

### 1. Prayer Times Component

```typescript
// hooks/usePrayerTimes.ts
interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  hijriDate: string;
}

export const usePrayerTimes = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ['prayerTimes', latitude, longitude],
    queryFn: () => fetchPrayerTimes(latitude, longitude),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });
};
```

### 2. Hero Section with Parallax

```typescript
// components/common/Hero.tsx
export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  return (
    <motion.section
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="hero-image-url"
          alt="Beautiful Mosque"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white text-center">
            Welcome to Our Mosque
          </h1>
        </motion.div>
      </div>
    </motion.section>
  );
};
```

### 3. Prayer Times Card Component

```typescript
// components/features/PrayerTimes/PrayerCard.tsx
export const PrayerCard = ({ prayer, time, isNext, isCurrent }) => {
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl shadow-lg transition-all duration-300",
        isNext && "bg-primary text-primary-foreground scale-105",
        isCurrent && "bg-accent border-2 border-primary"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{prayer}</h3>
          <p className="text-2xl font-bold">{time}</p>
        </div>
        {isNext && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Bell className="w-6 h-6" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
```

## API Integration

### Prayer Times Service

```typescript
// services/prayerTimes.ts
export const fetchPrayerTimes = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://api.islamicfinder.org/v1/prayer-times?lat=${lat}&lng=${lng}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }
  
  const data = await response.json();
  return transformPrayerData(data);
};

const transformPrayerData = (data: any): PrayerTimes => {
  return {
    fajr: data.results.datetime[0].times.Fajr,
    dhuhr: data.results.datetime[0].times.Dhuhr,
    asr: data.results.datetime[0].times.Asr,
    maghrib: data.results.datetime[0].times.Maghrib,
    isha: data.results.datetime[0].times.Isha,
    date: data.results.datetime[0].date.gregorian,
    hijriDate: data.results.datetime[0].date.hijri,
  };
};
```

## Design System Implementation

### Color Palette (Tailwind Config)

```typescript
// tailwind.config.ts - Extended colors
extend: {
  colors: {
    mosque: {
      primary: 'hsl(34, 47%, 85%)',     // Warm beige
      secondary: 'hsl(40, 25%, 92%)',    // Light cream
      accent: 'hsl(25, 76%, 65%)',       // Warm orange
      gold: 'hsl(43, 89%, 70%)',         // Islamic gold
      green: 'hsl(140, 40%, 45%)',       // Islamic green
      text: 'hsl(25, 20%, 25%)',         // Warm dark brown
    }
  },
  animation: {
    'fade-in-up': 'fadeInUp 0.6s ease-out',
    'slide-in-right': 'slideInRight 0.5s ease-out',
    'pulse-gentle': 'pulse 3s ease-in-out infinite',
  },
  fontFamily: {
    'arabic': ['Amiri', 'serif'],
    'primary': ['Inter', 'sans-serif'],
  }
}
```

### Custom Animations (index.css)

```css
/* Smooth micro-interactions */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Prayer time highlight animation */
.prayer-highlight {
  @apply relative overflow-hidden;
}

.prayer-highlight::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent;
  transform: translateX(-100%);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
```

## Responsive Design Strategy

### Mobile-First Approach

```typescript
// Breakpoint utilities
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

// Responsive grid system
const gridClasses = {
  mobile: 'grid-cols-1',
  tablet: 'md:grid-cols-2',
  desktop: 'lg:grid-cols-3 xl:grid-cols-4',
};
```

### Touch-Friendly Interactions

```typescript
// Touch gesture handling
const swipeHandlers = useSwipeable({
  onSwipedLeft: () => nextSlide(),
  onSwipedRight: () => prevSlide(),
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
});
```

## Performance Optimizations

### Image Optimization

```typescript
// Lazy loading with intersection observer
const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {loaded && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
```

### API Caching Strategy

```typescript
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

## Testing Strategy

### Component Testing

```typescript
// Prayer times component test
describe('PrayerTimes', () => {
  it('displays current prayer highlighted', () => {
    render(<PrayerTimes times={mockPrayerTimes} />);
    expect(screen.getByTestId('current-prayer')).toHaveClass('bg-accent');
  });

  it('shows next prayer with bell icon', () => {
    render(<PrayerTimes times={mockPrayerTimes} />);
    expect(screen.getByTestId('next-prayer')).toContainElement(
      screen.getByTestId('bell-icon')
    );
  });
});
```

### API Integration Testing

```typescript
// Mock API responses
const mockPrayerTimesResponse = {
  results: {
    datetime: [{
      times: {
        Fajr: '05:30',
        Dhuhr: '12:15',
        Asr: '15:45',
        Maghrib: '18:20',
        Isha: '19:45'
      }
    }]
  }
};
```

## Deployment Configuration

### Build Optimization

```typescript
// Vite config for production
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', 'lucide-react'],
        },
      },
    },
  },
  plugins: [
    react(),
    // Progressive Web App
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
});
```

### Environment Configuration

```typescript
// Environment variables
interface Config {
  VITE_PRAYER_API_URL: string;
  VITE_ANALYTICS_ID: string;
  VITE_MAPS_API_KEY: string;
}

export const config: Config = {
  VITE_PRAYER_API_URL: import.meta.env.VITE_PRAYER_API_URL,
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
  VITE_MAPS_API_KEY: import.meta.env.VITE_MAPS_API_KEY,
};
```

## Accessibility Implementation

### ARIA Labels and Roles

```typescript
// Accessible prayer times
<div role="region" aria-label="Prayer Times">
  <h2 id="prayer-times-heading">Today's Prayer Times</h2>
  <div role="list" aria-labelledby="prayer-times-heading">
    {prayers.map((prayer, index) => (
      <div
        key={prayer.name}
        role="listitem"
        aria-label={`${prayer.name} prayer at ${prayer.time}`}
        tabIndex={0}
      >
        {/* Prayer content */}
      </div>
    ))}
  </div>
</div>
```

### Keyboard Navigation

```typescript
// Focus management for prayer cards
const handleKeyDown = (event: KeyboardEvent, index: number) => {
  switch (event.key) {
    case 'ArrowRight':
      focusNextPrayer(index);
      break;
    case 'ArrowLeft':
      focusPrevPrayer(index);
      break;
    case 'Enter':
    case ' ':
      expandPrayerDetails(index);
      break;
  }
};
```

## Monitoring and Analytics

### Performance Monitoring

```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric) => {
  // Send to analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
  });
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### User Behavior Tracking

```typescript
// Custom events tracking
const trackPrayerTimeView = (prayerName: string) => {
  gtag('event', 'prayer_time_viewed', {
    event_category: 'Prayer Times',
    event_label: prayerName,
  });
};

const trackDonationClick = (amount: number) => {
  gtag('event', 'donation_initiated', {
    event_category: 'Donations',
    value: amount,
  });
};
```