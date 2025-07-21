import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Copy, Play, RefreshCw } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from '../hooks/use-toast';
import { useQuranDetail } from '../hooks/useQuran';
import { cleanHtml } from '../lib/utils';

export const QuranDetail: React.FC = () => {
    const { surahNumber } = useParams<{ surahNumber: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { data: surah, isLoading, error, refetch } = useQuranDetail(
        parseInt(surahNumber || '1')
    );
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);

    const isMakkiyah = surah?.tempat_turun === 'mekah';

    // Memoize the surah data to prevent unnecessary re-renders
    const memoizedSurah = useMemo(() => surah, [surah]);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePlayAudio = (audioUrl: string, ayatId: number) => {
        if (playingAudio === audioUrl) {
            setPlayingAudio(null);
            return;
        }

        setPlayingAudio(audioUrl);
        const audio = new Audio(audioUrl);
        audio.play().catch(() => {
            toast({
                title: "Error",
                description: "Gagal memutar audio",
                variant: "destructive",
            });
            setPlayingAudio(null);
        });

        audio.onended = () => {
            setPlayingAudio(null);
        };
    };

    const handleCopyAyat = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Berhasil",
                description: "Ayat telah disalin ke clipboard",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Gagal menyalin ayat",
                variant: "destructive",
            });
        }
    };

    // Function to render HTML content safely
    const renderHtmlContent = (htmlString: string) => {
        if (!htmlString) return null;

        const cleanedHtml = cleanHtml(htmlString);

        // If the content is just plain text without HTML, return it as is
        if (!cleanedHtml.includes('<')) {
            return <div className="text-gray-700 leading-relaxed italic text-sm">{cleanedHtml}</div>;
        }

        return <div className="text-gray-700 leading-relaxed italic text-sm" dangerouslySetInnerHTML={{ __html: cleanedHtml }} />;
    };

    // Handle back navigation based on source
    const handleBackNavigation = () => {
        // Check if user came from Quran List page
        if (location.state?.from === 'quran-list') {
            navigate('/quran');
        } else {
            // Default: go back to previous page
            navigate(-1);
        }
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
                                Gagal Memuat Surah
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Terjadi kesalahan saat memuat data surah. Silakan coba lagi.
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
                key="header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-6 shadow-lg"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleBackNavigation}
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali
                        </Button>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Al-Quran</h1>
                            <p className="text-green-100">
                                Surah {memoizedSurah?.nama_latin}
                            </p>
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
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <Card className="p-6">
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="w-16 h-16 rounded-full" />
                                        <div className="text-right space-y-2">
                                            <Skeleton className="w-32 h-8" />
                                            <Skeleton className="w-20 h-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="w-48 h-6" />
                                        <Skeleton className="w-64 h-4" />
                                    </div>
                                    <Skeleton className="w-32 h-4" />
                                </CardContent>
                            </Card>

                            {Array.from({ length: 3 }).map((_, index) => (
                                <Card key={index} className="p-6">
                                    <CardContent className="space-y-4">
                                        <Skeleton className="w-16 h-6" />
                                        <Skeleton className="w-full h-32" />
                                        <Skeleton className="w-3/4 h-4" />
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    ) : memoizedSurah ? (
                        // Surah Content
                        <motion.div
                            key={`surah-${memoizedSurah.nomor}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Surah Header */}
                            <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-green-50 shadow-xl">
                                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white pb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                                                {memoizedSurah.nomor}
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold mb-1" dir="rtl">
                                                    {memoizedSurah.nama}
                                                </h2>
                                                <p className="text-green-100 text-lg">
                                                    {memoizedSurah.nama_latin}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <Badge className="bg-white/20 text-white border-white/30 mb-2">
                                                {isMakkiyah ? 'Makkiyah' : 'Madaniyah'}
                                            </Badge>
                                            <p className="text-green-100 text-sm">
                                                {memoizedSurah.jumlah_ayat} Ayat
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                Arti
                                            </h3>
                                            <p className="text-gray-600 italic text-lg">
                                                "{memoizedSurah.arti}"
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                Deskripsi
                                            </h3>
                                            <div className="text-gray-600 leading-relaxed">
                                                {renderHtmlContent(memoizedSurah.deskripsi)}
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => handlePlayAudio(memoizedSurah.audio, 0)}
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                Putar Audio Surah
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Ayat List */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    Ayat ({memoizedSurah.ayat?.length || 0})
                                </h3>

                                {memoizedSurah.ayat?.map((ayat, index) => (
                                    <motion.div
                                        key={`ayat-${ayat.nomor}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        layout
                                    >
                                        <Card className="overflow-hidden border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            {ayat.nomor}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Arabic Text with Green Line and Copy Button */}
                                                    <div className="relative">
                                                        {/* Green Line on the Left */}
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-500 rounded-full"></div>

                                                        {/* Arabic Text */}
                                                        <div className="bg-gray-50 p-4 rounded-lg ml-4">
                                                            <p className="text-2xl font-arabic leading-loose text-gray-800 text-right" dir="rtl">
                                                                {ayat.ar}
                                                            </p>
                                                        </div>

                                                        {/* Copy Button under Arabic Text */}
                                                        <div className="flex justify-end mt-2 ml-4">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-green-600 hover:bg-green-50"
                                                                onClick={() => handleCopyAyat(ayat.ar)}
                                                            >
                                                                <Copy className="w-4 h-4 mr-1" />
                                                                Salin Ayat
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Latin Text */}
                                                    <div>
                                                        {renderHtmlContent(ayat.tr)}
                                                    </div>

                                                    {/* Indonesian Translation */}
                                                    <div>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {ayat.idn}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}; 