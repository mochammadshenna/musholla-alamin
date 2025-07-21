import { motion } from 'framer-motion';
import React from 'react';
import { QuranSurah } from '../../../types/quran';
import { Badge } from '../../ui/badge';
import { Card, CardContent } from '../../ui/card';

interface QuranCardProps {
    surah: QuranSurah;
    onClick: () => void;
}

export const QuranCard: React.FC<QuranCardProps> = ({ surah, onClick }) => {
    const isMakkiyah = surah.tempat_turun === 'mekah';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
        >
            <Card
                className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-green-50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl"
                onClick={onClick}
            >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full transform translate-x-8 -translate-y-8"></div>
                </div>

                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        {/* Surah Number */}
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {surah.nomor}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full opacity-80"></div>
                        </div>

                        {/* Arabic Name */}
                        <div className="text-right">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1 leading-tight" dir="rtl">
                                {surah.nama}
                            </h3>
                            <Badge
                                variant={isMakkiyah ? "default" : "secondary"}
                                className={`text-xs px-2 py-1 ${isMakkiyah
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-blue-100 text-blue-700 border-blue-200'
                                    }`}
                            >
                                {isMakkiyah ? 'Makkiyah' : 'Madaniyah'}
                            </Badge>
                        </div>
                    </div>

                    {/* Latin Name and Meaning */}
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                            {surah.nama_latin}
                        </h4>
                        <p className="text-sm text-gray-600 italic">
                            "{surah.arti}"
                        </p>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm text-gray-600">
                                {surah.jumlah_ayat} Ayat
                            </span>
                        </div>
                    </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/5 group-hover:to-green-600/5 transition-all duration-300 pointer-events-none"></div>
            </Card>
        </motion.div>
    );
}; 