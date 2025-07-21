import { useQuery } from '@tanstack/react-query';
import { QuranDetail, QuranSurah } from '../types/quran';

const QURAN_API_BASE = 'https://quran-api.santrikoding.com/api';

export const useQuranList = () => {
    return useQuery({
        queryKey: ['quran-list'],
        queryFn: async (): Promise<QuranSurah[]> => {
            const response = await fetch(`${QURAN_API_BASE}/surah/`);
            if (!response.ok) {
                throw new Error('Failed to fetch Quran list');
            }
            return response.json();
        },
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });
};

export const useQuranDetail = (surahNumber: number) => {
    return useQuery({
        queryKey: ['quran-detail', surahNumber],
        queryFn: async (): Promise<QuranDetail> => {
            const response = await fetch(`${QURAN_API_BASE}/surah/${surahNumber}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch Surah ${surahNumber}`);
            }
            return response.json();
        },
        enabled: !!surahNumber,
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}; 