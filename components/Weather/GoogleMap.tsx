'use client';
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline, Circle, HeatmapLayer } from '@react-google-maps/api';

const GoogleMapComponent = ({ regions, region }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  // Define custom icons for different ratings
  const getMarkerIcon = (rating: number) => {
    if (rating < 3) {
      return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Red for unsafe
    } else if (rating === 3) {
      return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'; // Yellow for neutral
    } else {
      return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // Green for safe
    }
  };

  const [googleMapsReady, setGoogleMapsReady] = useState(false); 

  const getWindMarkerIcon = (windDirection: number) => {
    return {
      path: 'M64 1 17.9 127 64 99.8l46.1 27.2L64 1zm0 20.4 32.6 89.2L64 91.3V21.4z', // Arrow path
      fillColor: 'brown',
      fillOpacity: 1,
      strokeWeight: 0.2,
      rotation: windDirection, // Rotate the SVG based on wind direction
      scale: 0.1, // Scale the arrow size
    };
  };

  const createWindLine = (location: any) => {
    const { lat, lng, windDirection } = location;
    const distance = 1000000; // Set a large fixed distance to ensure the line crosses the map (in meters)
    const angleRad = (windDirection * Math.PI) / 180; // Convert degrees to radians
  
    // Earth's radius in meters
    const R = 6371000;
  
    // Calculate the ending latitude and longitude using the Haversine formula for large distances
    const endLat = lat + (distance / R) * (180 / Math.PI) * Math.cos(angleRad);
    const endLng = lng + (distance / R) * (180 / Math.PI) * Math.sin(angleRad) / Math.cos(lat * Math.PI / 180);
  
    // Calculate the opposite end of the line in the reverse direction (to make the line bi-directional)
    const startLat = lat - (distance / R) * (180 / Math.PI) * Math.cos(angleRad);
    const startLng = lng - (distance / R) * (180 / Math.PI) * Math.sin(angleRad) / Math.cos(lat * Math.PI / 180);
  
    // Return a path that cuts across the map
    return [
      { lat: startLat, lng: startLng }, // Start point (opposite direction)
      { lat: lat, lng: lng }, // Original point
      { lat: endLat, lng: endLng }, // End point (forward direction)
    ];
  };
  

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
  };

  const heatmapData = googleMapsReady
  ? regions?.map((location: any) => ({
      location: new window.google.maps.LatLng(location.lat, location.lng), // Use LatLng object only after Google Maps is ready
      weight: location.thermalIntensity, // Use intensity to control heatmap strength
    }))
  : [];

  return (
    <div className="section overflow-x-hidden my-10 flex flex-col gap-5 relative">
      <p className="text-[28px] font-bold">This is the Map Display for the Location - {region}</p>

      <LoadScript 
        googleMapsApiKey="AIzaSyAUfYI1dWp9ox12hg_kU_oi2zEUW-Aci1E"
        libraries={['visualization']}  // Include the visualization library for HeatmapLayer
        onLoad={()=>setGoogleMapsReady(true)}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: regions[0].lat, lng: regions[0].lng }}
          zoom={15} // Adjust zoom level based on region size
          options={{ gestureHandling: 'greedy', disableDefaultUI: true }}>

          {/* Map through the regions array to place markers */}
          {regions.map((location: any, idx: number) => (
            <Marker
              key={idx}
              position={{ lat: location.lat, lng: location.lng }}
              icon={getMarkerIcon(location.rating)} // Custom icon based on rating
              onClick={() => setSelectedLocation(location)} // Set selected location for info window
            />
          ))}

          {/* Heatmap Layer */}
          <HeatmapLayer
            data={heatmapData}
            options={{
              radius: 60, // Adjust radius for heat spots
              opacity: 0.6, // Adjust opacity for visibility
            }}
          />

          {/* Display wind direction lines and markers */}
          {regions?.map((location: any, idx: number) => (
            <React.Fragment key={idx}>
              {/* Draw a line indicating wind direction */}
              <Polyline
                path={createWindLine(location)} // Get the path for the polyline
                options={{
                  strokeColor: 'gray', // Color of the line
                  strokeOpacity: 1,
                  strokeWeight: 0.2,
                }}
              />
              {/* Display the arrow marker for wind direction */}
              <Marker
                position={{ lat: location.lat, lng: location.lng }}
                icon={getWindMarkerIcon(location.windDirection)} // Custom icon for wind direction
              />
            </React.Fragment>
          ))}

          {/* Display InfoWindow for selected location */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}>
              <div>
                <h3>{selectedLocation.location}</h3>
                <p>{selectedLocation.region}, {selectedLocation.country}</p>
                <p>Suitability: {selectedLocation.suitability}</p>
                <p>Rating: {selectedLocation.rating}</p>
              </div>
            </InfoWindow>
          )}

          {/* Legend */}
          <div className='bg-white/80 shadow-2xl text-secondary glass flex flex-col gap-2 border absolute top-0 p-2 left-0 z-[1000]'>
            <div className="flex items-center gap-3">
              <div className="bg-red-600 h-[15px] w-[15px] rounded-full" />
              <p>Unsafe area</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-400 h-[15px] w-[15px] rounded-full" />
              <p>Quite safe area</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-600 h-[15px] w-[15px] rounded-full" />
              <p>Safe area</p>
            </div>
          </div>

        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
