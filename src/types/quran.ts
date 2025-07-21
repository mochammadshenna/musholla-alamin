export interface QuranSurah {
    nomor: number;
    nama: string;
    nama_latin: string;
    jumlah_ayat: number;
    tempat_turun: 'mekah' | 'madinah';
    arti: string;
    deskripsi: string;
    audio: string;
}

export interface QuranDetail extends QuranSurah {
    ayat: QuranAyat[];
}

export interface QuranAyat {
    id: number;
    ar: string;
    tr: string;
    idn: string;
    audio: string;
} 