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

  // DESKTOP-SPECIFIC SCENARIOS:
  // SCENARIO 5: Test Dzuhur next but not active (11:30 - 32 minutes before Dzuhur)
  // Expected: Desktop shows Dzuhur with "Selanjutnya" (not active yet)
  dzuhurNextNotActive: false, // Set to true to test Dzuhur next but not active

  // SCENARIO 6: Test Ashar next but not active (14:50 - 33 minutes before Ashar)
  // Expected: Desktop shows Ashar with "Selanjutnya" (not active yet)
  asharNextNotActive: false, // Set to true to test Ashar next but not active

  // SCENARIO 7: Test Maghrib active (17:55 - exactly at prayer time)
  // Expected: Desktop shows Maghrib with "Sedang Berlangsung" (active)
  maghribActive: false, // Set to true to test Maghrib active scenario

  // SCENARIO 8: Test Isya next but not active (18:30 - 38 minutes before Isya)
  // Expected: Desktop shows Isya with "Selanjutnya" (not active yet)
  isyaNextNotActive: false, // Set to true to test Isya next but not active

  // DESKTOP "SEDANG BERLANGSUNG" TEST SCENARIOS:
  // SCENARIO 9: Test Dzuhur next and active (12:02 - exactly at Dzuhur time)
  // Expected: Desktop shows Dzuhur with "Sedang Berlangsung" (next prayer is active)
  dzuhurNextAndActive: false, // Set to true to test Dzuhur next and active

  // SCENARIO 10: Test Ashar next and active (15:23 - exactly at Ashar time)
  // Expected: Desktop shows Ashar with "Sedang Berlangsung" (next prayer is active)
  asharNextAndActive: false, // Set to true to test Ashar next and active

  // SCENARIO 11: Test Maghrib next and active (17:55 - exactly at Maghrib time)
  // Expected: Desktop shows Maghrib with "Sedang Berlangsung" (next prayer is active)
  maghribNextAndActive: false, // Set to true to test Maghrib next and active

  // SCENARIO 12: Test Isya next and active (19:08 - exactly at Isya time)
  // Expected: Desktop shows Isya with "Sedang Berlangsung" (next prayer is active)
  isyaNextAndActive: false, // Set to true to test Isya next and active

  // SCENARIO 13: Test Dzuhur next and active early (11:55 - 7 minutes before Dzuhur, within active window)
  // Expected: Desktop shows Dzuhur with "Sedang Berlangsung" (next prayer is active)
  dzuhurNextAndActiveEarly: false, // Set to true to test Dzuhur next and active early

  // SCENARIO 14: Test Ashar next and active late (15:45 - 22 minutes after Ashar, within active window)
  // Expected: Desktop shows Ashar with "Sedang Berlangsung" (next prayer is active)
  asharNextAndActiveLate: false, // Set to true to test Ashar next and active late
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

  // DESKTOP-SPECIFIC TEST SCENARIOS
  if (TESTING_CONFIG.dzuhurNextNotActive) {
    const testTime = new Date(now);
    testTime.setHours(11, 30, 0, 0); // 11:30 - Dzuhur next but not active (32 min before)
    console.log('🧪 Testing: Dzuhur Next but Not Active at 11:30');
    return testTime;
  }

  if (TESTING_CONFIG.asharNextNotActive) {
    const testTime = new Date(now);
    testTime.setHours(14, 50, 0, 0); // 14:50 - Ashar next but not active (33 min before)
    console.log('🧪 Testing: Ashar Next but Not Active at 14:50');
    return testTime;
  }

  if (TESTING_CONFIG.maghribActive) {
    const testTime = new Date(now);
    testTime.setHours(17, 55, 0, 0); // 17:55 - Maghrib active
    console.log('🧪 Testing: Maghrib Active at 17:55');
    return testTime;
  }

  if (TESTING_CONFIG.isyaNextNotActive) {
    const testTime = new Date(now);
    testTime.setHours(18, 30, 0, 0); // 18:30 - Isya next but not active (38 min before)
    console.log('🧪 Testing: Isya Next but Not Active at 18:30');
    return testTime;
  }

  // DESKTOP "SEDANG BERLANGSUNG" TEST SCENARIOS
  if (TESTING_CONFIG.dzuhurNextAndActive) {
    const testTime = new Date(now);
    testTime.setHours(12, 2, 0, 0); // 12:02 - Dzuhur next and active
    console.log('🧪 Testing: Dzuhur Next and Active at 12:02');
    return testTime;
  }

  if (TESTING_CONFIG.asharNextAndActive) {
    const testTime = new Date(now);
    testTime.setHours(15, 23, 0, 0); // 15:23 - Ashar next and active
    console.log('🧪 Testing: Ashar Next and Active at 15:23');
    return testTime;
  }

  if (TESTING_CONFIG.maghribNextAndActive) {
    const testTime = new Date(now);
    testTime.setHours(17, 55, 0, 0); // 17:55 - Maghrib next and active
    console.log('🧪 Testing: Maghrib Next and Active at 17:55');
    return testTime;
  }

  if (TESTING_CONFIG.isyaNextAndActive) {
    const testTime = new Date(now);
    testTime.setHours(19, 8, 0, 0); // 19:08 - Isya next and active
    console.log('🧪 Testing: Isya Next and Active at 19:08');
    return testTime;
  }

  if (TESTING_CONFIG.dzuhurNextAndActiveEarly) {
    const testTime = new Date(now);
    testTime.setHours(11, 55, 0, 0); // 11:55 - Dzuhur next and active early
    console.log('🧪 Testing: Dzuhur Next and Active Early at 11:55');
    return testTime;
  }

  if (TESTING_CONFIG.asharNextAndActiveLate) {
    const testTime = new Date(now);
    testTime.setHours(15, 45, 0, 0); // 15:45 - Ashar next and active late
    console.log('🧪 Testing: Ashar Next and Active Late at 15:45');
    return testTime;
  }

  return null; // No testing, use real time
};

// Local prayer time calculation (fallback when API fails)
const calculateLocalPrayerTimes = (location: Location): PrayerTimes => {
  const today = new Date();
  const hijriDate = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  // Simple calculation based on Jakarta coordinates and current date
  // This is a basic approximation - for production, use a proper prayer time library
  const currentMonth = today.getMonth() + 1; // 1-12

  // Approximate prayer times for Jakarta (these vary by season)
  let prayerTimes;

  if (currentMonth >= 3 && currentMonth <= 5) {
    // March-May (Spring)
    prayerTimes = {
      fajr: '04:45',
      dhuhr: '11:59',
      asr: '15:21',
      maghrib: '17:53',
      isha: '19:23'
    };
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    // June-August (Summer)
    prayerTimes = {
      fajr: '04:30',
      dhuhr: '11:55',
      asr: '15:15',
      maghrib: '17:45',
      isha: '19:15'
    };
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    // September-November (Fall)
    prayerTimes = {
      fajr: '04:40',
      dhuhr: '11:58',
      asr: '15:18',
      maghrib: '17:50',
      isha: '19:20'
    };
  } else {
    // December-February (Winter)
    prayerTimes = {
      fajr: '04:50',
      dhuhr: '12:02',
      asr: '15:25',
      maghrib: '17:55',
      isha: '19:25'
    };
  }

  return {
    ...prayerTimes,
    date: today.toLocaleDateString(),
    hijriDate: hijriDate,
    location: `${location.city || 'Jakarta'}, ${location.country || 'Indonesia'}`,
    source: 'local' // Indicate this is locally calculated
  };
};

// Real API call to fetch prayer times
export const fetchPrayerTimes = async (location: Location): Promise<PrayerTimes> => {
  try {
    console.log('📅 Fetching prayer times from API...');
    console.log('📍 Location:', location);

    // Determine API base URL based on environment
    const isDevelopment = import.meta.env.DEV;
    const baseUrl = isDevelopment
      ? 'http://localhost:3001'
      : window.location.origin; // Use same domain in production

    console.log(`🌍 Environment: ${isDevelopment ? 'Development' : 'Production'}`);
    console.log(`🔗 Base URL: ${baseUrl}`);

    // Try multiple prayer time APIs for reliability
    const apis = [
      // Primary API: Vercel API route (production) or local proxy (development)
      `${baseUrl}/api/prayer-times?city=Jakarta&country=Indonesia&method=8`,
      // Fallback: Direct API (might work in some browsers)
      `https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=8`,
      // Alternative calculation method
      `${baseUrl}/api/prayer-times?city=Jakarta&country=Indonesia&method=2`,
      // Another alternative method
      `${baseUrl}/api/prayer-times?city=Jakarta&country=Indonesia&method=1`,
    ];

    let lastError: Error | null = null;

    for (let i = 0; i < apis.length; i++) {
      const apiUrl = apis[i];
      try {
        console.log(`🔄 Attempt ${i + 1}/${apis.length}: Trying API: ${apiUrl}`);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(`📡 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📊 API Response data:', data);

        if (!data.data || !data.data.timings) {
          throw new Error('Invalid API response format - missing data or timings');
        }

        const timings = data.data.timings;
        const date = data.data.date;

        console.log('⏰ Raw timings from API:', timings);
        console.log('📅 Date info from API:', date);

        // Transform API response to our format
        const prayerTimes: PrayerTimes = {
          fajr: timings.Fajr || '04:53',
          dhuhr: timings.Dhuhr || '12:02',
          asr: timings.Asr || '15:23',
          maghrib: timings.Maghrib || '17:55',
          isha: timings.Isha || '19:08',
          date: date?.readable || new Date().toLocaleDateString(),
          hijriDate: `${date?.hijri?.day} ${date?.hijri?.month?.en} ${date?.hijri?.year}` || '24 Muharram 1447',
          location: `${location.city || 'Jakarta'}, ${location.country || 'Indonesia'}`,
          source: 'api' // Indicate this is real API data
        };

        console.log('✅ Prayer times fetched successfully from API:', prayerTimes);
        return prayerTimes;

      } catch (error) {
        console.warn(`⚠️ API attempt ${i + 1} failed:`, error);
        lastError = error as Error;

        // If this is the last attempt, don't continue
        if (i === apis.length - 1) {
          break;
        }

        // Wait a bit before trying the next API
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }
    }

    // If all APIs fail, use local calculation instead of static fallback
    console.warn('⚠️ Failed to fetch prayer times from all APIs, using local calculation:', lastError);

    const localTimes = calculateLocalPrayerTimes(location);
    console.log('📅 Using locally calculated prayer times:', localTimes);
    return localTimes;

  } catch (error) {
    console.warn('⚠️ Unexpected error in prayer times fetching, using local calculation:', error);

    // Return local calculation as final fallback
    const localTimes = calculateLocalPrayerTimes(location);
    console.log('📅 Using locally calculated prayer times as fallback:', localTimes);
    return localTimes;
  }
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

  // Find the next prayer based on time
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;

    if (currentTime <= prayerMinutes) {
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

    if (currentTime <= prayerMinutes) {
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