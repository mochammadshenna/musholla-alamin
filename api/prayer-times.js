// Vercel API Route: /api/prayer-times
// This replaces the local proxy server for production deployment

export default async function handler(req, res) {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { city = 'Jakarta', country = 'Indonesia', method = '8' } = req.query;

        console.log(`📅 Vercel API: Fetching prayer times for ${city}, ${country} with method ${method}`);

        const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        console.log('✅ Vercel API: Prayer times fetched successfully');
        res.status(200).json(data);

    } catch (error) {
        console.error('❌ Vercel API: Error fetching prayer times:', error);
        res.status(500).json({
            error: 'Failed to fetch prayer times',
            message: error.message
        });
    }
} 