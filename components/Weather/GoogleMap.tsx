'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline, HeatmapLayer } from '@react-google-maps/api';

// Utility function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const GoogleMapComponent = ({ regions, region }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [flightPath, setFlightPath] = useState<any[]>([]); // Array to store waypoints (turning points)
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total flight distance
  const [glideRatio, setGlideRatio] = useState<number>(0); // Glide ratio input
  const [airspeed, setAirspeed] = useState<number>(0); // Airspeed input (km/h)
  const [flightTime, setFlightTime] = useState<number>(0); // Time of flight
  const [flightShareUrl, setFlightShareUrl] = useState<string>(''); // Flight share URL

  // Handle map clicks to add waypoints (turning points)
  const handleMapClick = (event: any) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Add the clicked point as a waypoint (turning point)
    setFlightPath((prevPath) => [...prevPath, { lat, lng }]);
  };

  // Handle marker drag to update waypoint position
  const handleMarkerDrag = (index: number, event: any) => {
    const updatedLat = event.latLng.lat();
    const updatedLng = event.latLng.lng();

    // Update the specific waypoint that was dragged
    setFlightPath((prevPath) => {
      const updatedPath = [...prevPath];
      updatedPath[index] = { lat: updatedLat, lng: updatedLng };
      return updatedPath;
    });
  };

  // Calculate total distance whenever flightPath changes
  useEffect(() => {
    if (flightPath.length > 1) {
      let distance = 0;
      for (let i = 0; i < flightPath.length - 1; i++) {
        distance += calculateDistance(
          flightPath[i].lat,
          flightPath[i].lng,
          flightPath[i + 1].lat,
          flightPath[i + 1].lng
        );
      }
      setTotalDistance(distance);
    }
  }, [flightPath]);

  // Calculate flight time based on airspeed and distance
  useEffect(() => {
    if (totalDistance > 0 && airspeed > 0) {
      setFlightTime(totalDistance / airspeed); // Time = Distance / Speed
    }
  }, [totalDistance, airspeed]);

  // Generate shareable flight URL
  const handleShareFlight = () => {
    const pathData = flightPath.map(point => `lat=${point.lat}&lng=${point.lng}`).join('&');
    const shareUrl = `${window.location.origin}/share?${pathData}`;
    setFlightShareUrl(shareUrl);
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

      <div className='flex items-center gap-3'>
        <p>For Flight Planning</p>
        <input type="date" className='p-3'/>
      </div>

      {/* Flight Planning Input Section */}
      <div className="bg-white p-4 shadow-lg border rounded-lg my-4">
        <h3 className="text-xl font-bold">Flight Planning</h3>
        <p>Total Distance: {totalDistance.toFixed(2)} km</p>
        
        <div className="flex items-center gap-3">
          <label htmlFor="glide-ratio">Glide Ratio:</label>
          <input 
            type="number" 
            id="glide-ratio"
            className="border p-2" 
            value={glideRatio} 
            onChange={(e) => setGlideRatio(Number(e.target.value))} 
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="airspeed">Airspeed (km/h):</label>
          <input 
            type="number" 
            id="airspeed"
            className="border p-2" 
            value={airspeed} 
            onChange={(e) => setAirspeed(Number(e.target.value))} 
          />
        </div>

        {/* Display Estimated Glide Range */}
        {glideRatio > 0 && (
          <p>Estimated Flight Range: {(totalDistance / glideRatio).toFixed(2)} km</p>
        )}

        {/* Display Time of Flight */}
        {flightTime > 0 && (
          <p>Estimated Flight Time: {flightTime.toFixed(2)} hours</p>
        )}

        {/* Share Flight Button */}
        <button 
          onClick={handleShareFlight}
          className="mt-3 p-3 bg-blue-600 text-white rounded"
        >
          Share Flight Plan
        </button>

        {/* Display Share URL */}
        {flightShareUrl && (
          <div className="mt-3">
            <p>Share this flight plan:</p>
            <a href={flightShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {flightShareUrl}
            </a>
          </div>
        )}
      </div>

      <LoadScript
        googleMapsApiKey="AIzaSyAUfYI1dWp9ox12hg_kU_oi2zEUW-Aci1E"
        libraries={['visualization']}  // Include the visualization library for HeatmapLayer
        onLoad={() => setGoogleMapsReady(true)}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: regions[0].lat, lng: regions[0].lng }}
          zoom={15} // Adjust zoom level based on region size
          options={{ gestureHandling: 'greedy', disableDefaultUI: true }}
          onClick={handleMapClick} // Handle map clicks to add waypoints
        >
          {/* Map through the regions array to place markers */}
          {regions.map((location: any, idx: number) => (
            <Marker
              key={idx}
              position={{ lat: location.lat, lng: location.lng }}
              icon={location.rating < 3 
                ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                : location.rating === 3
                ? 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              } // Custom icon based on rating
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

          {/* Flight Path Polyline */}
          {flightPath.length > 1 && (
            <>
              {flightPath.map((point, index) => (
                <Marker
                  key={index}
                  position={point}
                  draggable={true} // Make the waypoints (turning points) draggable
                  onDragEnd={(event) => handleMarkerDrag(index, event)}
                  icon={index === 0 
                    ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' // Start point marker
                    : index === flightPath.length - 1
                    ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // End point marker
                    : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Turning points marker
                  }
                />
              ))}
              <Polyline
                path={flightPath}
                options={{
                  strokeColor: '#0000FF', // Blue for flight path
                  strokeOpacity: 0.8,
                  strokeWeight: 3,
                }}
              />
            </>
          )}

          {/* Display InfoWindow for selected location */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h3>{selectedLocation.location}</h3>
                <p>{selectedLocation.region}, {selectedLocation.country}</p>
                <p>Suitability: {selectedLocation.suitability}</p>
                <p>Rating: {selectedLocation.rating}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
