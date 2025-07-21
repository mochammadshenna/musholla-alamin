export interface PrayerTime {
  name: string;
  time: string;
  arabic: string;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  hijriDate?: string;
  location?: string;
  source?: 'api' | 'fallback' | 'local'; // Indicate data source
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface IslamicDate {
  day: number;
  month: string;
  year: number;
  designation: {
    abbreviated: string;
    expanded: string;
  };
}

export interface ApiResponse {
  code: number;
  status: string;
  results: {
    datetime: Array<{
      times: {
        Fajr: string;
        Dhuhr: string;
        Asr: string;
        Maghrib: string;
        Isha: string;
      };
      date: {
        readable: string;
        timestamp: string;
        hijri: IslamicDate;
        gregorian: {
          date: string;
          format: string;
          day: string;
          weekday: {
            en: string;
          };
          month: {
            number: number;
            en: string;
          };
          year: string;
        };
      };
    }>;
  };
}