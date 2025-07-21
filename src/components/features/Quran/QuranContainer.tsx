import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, RefreshCw } from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuranList } from '../../../hooks/useQuran';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { QuranCard } from './QuranCard';

export const QuranContainer: React.FC = () => {
    const navigate = useNavigate();
    const { data: surahs, isLoading, error, refetch } = useQuranList();

    const displayedSurahs = useMemo(() => surahs?.slice(0, 3), [surahs]);

    const handleSurahClick = (surahNumber: number) => {
        navigate(`/quran/${surahNumber}`, { state: { from: 'home' } });
    };

    const handleViewAllSurahs = () => {
        navigate('/quran');
    };

    if (error) {
        return (
            <section className="py-16 bg-gradient-to-br from-green-50 to-white">
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
                                Terjadi kesalahan saat memuat data Al-Qur&apos;an. Silakan coba lagi.
                            </p>
                            <Button onClick={() => refetch()} className="bg-green-600 hover:bg-green-700">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Coba Lagi
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-green-400 rounded-full transform -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full transform translate-x-48 translate-y-48"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    key="quran-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Al-Qur&apos;an
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Baca dan pelajari Al-Quran dengan mudah. Pilih surah yang ingin Anda baca.
                    </p>
                </motion.div>

                {/* Quran Cards Grid with Blur Effect */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                // Loading Skeletons
                                Array.from({ length: 3 }).map((_, index) => (
                                    <motion.div
                                        key={`skeleton-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
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
                                ))
                            ) : (
                                // Actual Quran Cards
                                displayedSurahs?.map((surah, index) => (
                                    <motion.div
                                        key={`surah-${surah.nomor}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        layout
                                    >
                                        <QuranCard
                                            surah={surah}
                                            onClick={() => handleSurahClick(surah.nomor)}
                                        />
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Blur Effect Overlay */}
                    {!isLoading && surahs && surahs.length > 3 && (
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                    )}
                </div>

                {/* View All Surahs Button */}
                {!isLoading && surahs && (
                    <motion.div
                        key="view-all-button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="text-center mt-8"
                    >
                        <Button
                            onClick={handleViewAllSurahs}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                        >
                            Lihat Semua Surah
                            <BookOpen className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}; 