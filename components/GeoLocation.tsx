'use client';
import { useState, useEffect } from 'react';

interface Geolocation {
  latitude: number;
  longitude: number;
  accuracy?: number;  // Optional accuracy for Geolocation API
  city?: string;      // Add city and country for IP-based location
  country?: string;
}

const GeoLocator = () => {
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch location from IP as a fallback
  const fetchLocationFromIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/'); // Using ipapi.co service
      const data = await response.json();
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        country: data.country_name,
      };
    } catch (error) {
      console.error('Error fetching location from IP:', error);
      setError('Error fetching location from IP');
    }
  };

  useEffect(() => {
    const getLocation = () => {

      fetchLocationFromIP().then(fallbackLocation => {
        if (fallbackLocation) {
          setLocation(fallbackLocation);
        }
        setLoading(false);
      })
    }
    

    getLocation();
  }, []);

  console.log(location)
  return { location, error, loading };
};

export default GeoLocator;
