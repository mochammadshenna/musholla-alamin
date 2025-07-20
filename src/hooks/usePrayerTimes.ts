import { Location, PrayerTimes } from '@/types/prayer';
import { useQuery } from '@tanstack/react-query';

// TESTING UTILITY: Easy testing for different prayer time scenarios
// Uncomment the scenario you want to test and comment out the others
const TESTING_CONFIG = {
  // SCENARIO 1: Test Dzuhur active (12:02 - exactly at prayer time)
  // Expected: Dzuhur shows "Sedang Berlangsung", sequence: Ashar → Maghrib → Isya → Subuh → Dzuhur
  dzuhurActive: false, // Set to true to test Dzuhur active scenario

  // SCENARIO 2: Test Dzuhur countdown (11:50 - 10 minutes before Dzuhur)
  // Expected: Countdown shows "Selanjutnya Dzuhur", sequence: Dzuhur → Ashar → Maghrib → Isya → Subuh
  dzuhurCountdown: false, // Set to true to test Dzuhur countdown scenario

  // SCENARIO 3: Test Ashar active (15:23 - exactly at prayer time)
  // Expected: Ashar shows "Sedang Berlangsung", sequence: Maghrib → Isya → Subuh → Dzuhur → Ashar
  asharActive: false, // Set to true to test Ashar active scenario

  // SCENARIO 4: Test Ashar countdown (15:10 - 13 minutes before Ashar)
  // Expected: Countdown shows "Selanjutnya Ashar", sequence: Ashar → Maghrib → Isya → Subuh → Dzuhur
  asharCountdown: false, // Set to true to test Ashar countdown scenario
};

// Helper function to get test time based on configuration
const getTestTime = (): Date | null => {
  const now = new Date();

  if (TESTING_CONFIG.dzuhurActive) {
    const testTime = new Date(now);
    testTime.setHours(12, 2, 0, 0); // 12:02 - Dzuhur active
    console.log('🧪 Testing: Dzuhur Active at 12:02');
    return testTime;
  }

  if (TESTING_CONFIG.dzuhurCountdown) {
    const testTime = new Date(now);
    testTime.setHours(11, 50, 0, 0); // 11:50 - Dzuhur countdown
    console.log('🧪 Testing: Dzuhur Countdown at 11:50');
    return testTime;
  }

  if (TESTING_CONFIG.asharActive) {
    const testTime = new Date(now);
    testTime.setHours(15, 23, 0, 0); // 15:23 - Ashar active
    console.log('🧪 Testing: Ashar Active at 15:23');
    return testTime;
  }

  if (TESTING_CONFIG.asharCountdown) {
    const testTime = new Date(now);
    testTime.setHours(15, 10, 0, 0); // 15:10 - Ashar countdown
    console.log('🧪 Testing: Ashar Countdown at 15:10');
    return testTime;
  }

  return null; // No testing, use real time
};

export const fetchPrayerTimes = async (location: Location): Promise<PrayerTimes> => {
  // Use reliable fallback prayer times for Jakarta (from timesprayer.com widget)
  console.log('📅 Using prayer times for Jakarta (from timesprayer.com widget)');

  const prayerTimes = {
    fajr: '04:53',
    dhuhr: '12:02',
    asr: '15:23',
    maghrib: '17:55',
    isha: '19:08',
    date: new Date().toLocaleDateString(),
    hijriDate: '24 Muharram 1447',
    location: 'Jakarta, Indonesia'
  };

  console.log('✅ Prayer times loaded successfully:', prayerTimes);
  return prayerTimes;
};

export const usePrayerTimes = (location: Location) => {
  return useQuery({
    queryKey: ['prayerTimes', location.latitude, location.longitude],
    queryFn: () => fetchPrayerTimes(location),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: 1000 * 60 * 60, // 1 hour
    enabled: !!location.latitude && !!location.longitude,
  });
};

export const getCurrentPrayer = (prayerTimes: PrayerTimes): string => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'fajr', time: prayerTimes.fajr },
    { name: 'dhuhr', time: prayerTimes.dhuhr },
    { name: 'asr', time: prayerTimes.asr },
    { name: 'maghrib', time: prayerTimes.maghrib },
    { name: 'isha', time: prayerTimes.isha },
  ];

  // Find the current prayer based on time
  for (let i = 0; i < prayers.length; i++) {
    const [hours, minutes] = prayers[i].time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    // If current time is before this prayer time, the previous prayer is current
    if (currentTime < prayerMinutes) {
      return i === 0 ? 'isha' : prayers[i - 1].name;
    }
  }

  // If we've passed all prayers today, isha is current
  return 'isha';
};

export const getNextPrayer = (prayerTimes: PrayerTimes): { name: string; time: string } => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  // Find the next prayer based on time
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    if (currentTime < prayerMinutes) {
      return prayer;
    }
  }

  // If no prayer found today, return Subuh of next day
  return { name: 'Subuh', time: prayerTimes.fajr };
};

// Mobile-specific functions
export const isPrayerActive = (prayerTime: string): boolean => {
  const now = new Date();

  // Use test time if testing is enabled, otherwise use real time
  const testTime = getTestTime();
  const currentTime = testTime
    ? testTime.getHours() * 60 + testTime.getMinutes()
    : now.getHours() * 60 + now.getMinutes();

  const [hours, minutes] = prayerTime.split(':').map(Number);
  const prayerMinutes = hours * 60 + minutes;

  // Check if current time is within 10 minutes before to 30 minutes after prayer time
  const timeDiff = currentTime - prayerMinutes;
  return timeDiff >= -10 && timeDiff <= 30;
};

export const getActivePrayer = (prayerTimes: PrayerTimes): { name: string; time: string; key: string } | null => {
  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr, key: 'fajr' },
    { name: 'Dzuhur', time: prayerTimes.dhuhr, key: 'dhuhr' },
    { name: 'Ashar', time: prayerTimes.asr, key: 'asr' },
    { name: 'Maghrib', time: prayerTimes.maghrib, key: 'maghrib' },
    { name: 'Isya', time: prayerTimes.isha, key: 'isha' },
  ];

  for (const prayer of prayers) {
    if (isPrayerActive(prayer.time)) {
      return prayer;
    }
  }
  return null;
};

export const getNextPrayerForCountdown = (prayerTimes: PrayerTimes): { name: string; time: string } => {
  const now = new Date();

  // Use test time if testing is enabled, otherwise use real time
  const testTime = getTestTime();
  const currentTime = testTime
    ? testTime.getHours() * 60 + testTime.getMinutes()
    : now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: prayerTimes.fajr },
    { name: 'Dzuhur', time: prayerTimes.dhuhr },
    { name: 'Ashar', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isya', time: prayerTimes.isha },
  ];

  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    if (currentTime < prayerMinutes) {
      return prayer;
    }
  }

  return { name: 'Subuh', time: prayerTimes.fajr };
};

export const getMobilePrayerSequence = (prayerTimes: PrayerTimes, startPrayerKey: string): Array<{ name: string; arabic: string; time: string; key: string }> => {
  const allPrayers = [
    { name: 'Subuh', arabic: 'الفجر', time: prayerTimes.fajr, key: 'fajr' },
    { name: 'Dzuhur', arabic: 'الظهر', time: prayerTimes.dhuhr, key: 'dhuhr' },
    { name: 'Ashar', arabic: 'العصر', time: prayerTimes.asr, key: 'asr' },
    { name: 'Maghrib', arabic: 'المغرب', time: prayerTimes.maghrib, key: 'maghrib' },
    { name: 'Isya', arabic: 'العشاء', time: prayerTimes.isha, key: 'isha' },
  ];

  // Find the starting index
  const startIndex = allPrayers.findIndex(prayer => prayer.key === startPrayerKey);

  if (startIndex === -1) return allPrayers;

  // Create sequence starting from the specified prayer
  const sequence = [];
  for (let i = 0; i < 5; i++) {
    const index = (startIndex + i) % 5;
    sequence.push(allPrayers[index]);
  }

  return sequence;
};

// Get remaining prayers in sequence (for mobile view) - Fixed to use proper ordering
export const getRemainingPrayers = (prayerTimes: PrayerTimes, currentPrayer: string, nextPrayer: { name: string; time: string }) => {
  const allPrayers = [
    { name: 'Subuh', arabic: 'الفجر', time: prayerTimes.fajr, key: 'fajr' },
    { name: 'Dzuhur', arabic: 'الظهر', time: prayerTimes.dhuhr, key: 'dhuhr' },
    { name: 'Ashar', arabic: 'العصر', time: prayerTimes.asr, key: 'asr' },
    { name: 'Maghrib', arabic: 'المغرب', time: prayerTimes.maghrib, key: 'maghrib' },
    { name: 'Isya', arabic: 'العشاء', time: prayerTimes.isha, key: 'isha' },
  ];

  // Create a mapping for prayer names to keys
  const nameToKeyMap: { [key: string]: string } = {
    'Subuh': 'fajr',
    'Dzuhur': 'dhuhr',
    'Ashar': 'asr',
    'Maghrib': 'maghrib',
    'Isya': 'isha'
  };

  // Filter out current prayer and next prayer (which is in countdown)
  return allPrayers.filter(prayer => {
    const nextPrayerKey = nameToKeyMap[nextPrayer.name];
    return prayer.key !== currentPrayer && prayer.key !== nextPrayerKey;
  });
};