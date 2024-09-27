'use client';
import { useState, useEffect } from 'react';

interface Geolocation {
  latitude: number;
  longitude: number;
}

const GeoLocator = () => {
  const [location, setLocation] = useState<Geolocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
      }
    };

    getLocation();
  }, []);

  

  return location
};



export default GeoLocator;