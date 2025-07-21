import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuranCard } from '../components/features/Quran/QuranCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { useQuranList } from '../hooks/useQuran';

export const QuranList: React.FC = () => {
    const navigate = useNavigate();
    const { data: surahs, isLoading, error, refetch } = useQuranList();

    // Memoize the surahs data to prevent unnecessary re-renders
    const memoizedSurahs = useMemo(() => surahs, [surahs]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSurahClick = (surahNumber: number) => {
        navigate(`/quran/${surahNumber}`, { state: { from: 'quran-list' } });
    };

    const handleBackToHome = () => {
        navigate('/', { state: { scrollTo: 'quran-section' } });
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
                <div className="container mx-auto px-4">
                    <Card className="max-w-md mx-auto text-center p-8">
                        <CardContent>
                            <div className="text-red-500 mb-4">
                                <RefreshCw className="w-12 h-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Gagal Memuat Data
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Terjadi kesalahan saat memuat data Al-Quran. Silakan coba lagi.
                            </p>
                            <Button onClick={() => refetch()} className="bg-green-600 hover:bg-green-700">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Coba Lagi
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Header */}
            <motion.div
                key="quran-list-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 shadow-lg"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleBackToHome}
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali
                        </Button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Al-Quran</h1>
                            <p className="text-green-100">Semua Surah</p>
                        </div>

                        <div className="w-20"></div>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        // Loading State
                        <motion.div
                            key="loading-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {Array.from({ length: 12 }).map((_, index) => (
                                <motion.div
                                    key={`skeleton-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="p-6">
                                        <CardContent className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <Skeleton className="w-12 h-12 rounded-full" />
                                                <div className="text-right space-y-2">
                                                    <Skeleton className="w-24 h-6" />
                                                    <Skeleton className="w-16 h-4" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="w-32 h-5" />
                                                <Skeleton className="w-24 h-4" />
                                            </div>
                                            <Skeleton className="w-20 h-4" />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // Surah Grid
                        <motion.div
                            key="surah-grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {memoizedSurahs?.map((surah, index) => (
                                <motion.div
                                    key={`surah-${surah.nomor}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    layout
                                >
                                    <QuranCard
                                        surah={surah}
                                        onClick={() => handleSurahClick(surah.nomor)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}; 