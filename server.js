import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for prayer times
app.get('/api/prayer-times', async (req, res) => {
    try {
        const { city = 'Jakarta', country = 'Indonesia', method = '8' } = req.query;

        console.log(`📅 Proxying prayer times request for ${city}, ${country} with method ${method}`);

        const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        console.log('✅ Prayer times proxied successfully');
        res.json(data);

    } catch (error) {
        console.error('❌ Error proxying prayer times:', error);
        res.status(500).json({
            error: 'Failed to fetch prayer times',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Prayer times proxy server is running' });
});

app.listen(PORT, () => {
    console.log(`🚀 Prayer times proxy server running on http://localhost:${PORT}`);
    console.log(`📡 Proxy endpoint: http://localhost:${PORT}/api/prayer-times`);
}); 