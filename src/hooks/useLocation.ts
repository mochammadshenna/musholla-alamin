import { useState, useEffect } from 'react';
import { Location } from '@/types/prayer';

export const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: -6.2088, // Jakarta default
    longitude: 106.8456,
    city: 'Jakarta',
    country: 'Indonesia'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: 'Your Location',
        country: ''
      });
      setLoading(false);
      setError(null);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.warn('Geolocation error:', error.message);
      setError('Unable to get your location. Using default location.');
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
  };

  return { location, loading, error, updateLocation };
};