'use client';
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';

const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

const MapReview = ({ region, regions, waypoints, setWaypoints }: any) => {
  const [weatherData, setWeatherData] = useState({
    temperature: '36',
    windSpeed: '260',
    windDirection: '35 Nw',
    rainChances: '26.5'
  });

  const center: [number, number] = [51.505, -0.09]; // Example latitude and longitude

  const position = [51.505, -0.09]

  const AddMarker = () => {
    useMapEvents({
      click(e) {
        const newWaypoint = [e.latlng.lat, e.latlng.lng];
        setWaypoints((prevWaypoints) => [...prevWaypoints, newWaypoint]);
      }
    });
    return null;
  };
  return (
    <div className='mx-[5%] my-10 flex flex-col gap-5' id="map">
      <p className="text-[28px] font-bold">
        This is the Map Display for the Location - {region}
      </p>

      <div className="flex items-center gap-3">
        <div className="bg-red-600 h-[30px] w-[30px] rounded-full" />
        <p>Indicates unsafe area</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-yellow-400 h-[30px] w-[30px] rounded-full" />
        <p>Indicates quite safe area</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-green-600 h-[30px] w-[30px] rounded-full" />
        <p>Indicates safe area</p>
      </div>

      <MapContainer center={[regions[25].lat, regions[0].lng]} zoom={13} className="h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {regions?.map((location: any, index: number) => {
          console.log(location);
          let circleColor;

          // Set the color based on the rating
          if (location.rating < 3) {
            circleColor = 'red'; // Unsafe area
          } else if (location.rating === 3) {
            circleColor = 'yellow'; // Neutral area
          } else {
            circleColor = 'green'; // Safe area
          }

          return (
            <Circle
              key={index}
              center={[location.lat, location.lng]}
              radius={200} // Adjust the radius as needed
              color={circleColor} // Use the color determined above
              fillOpacity={0.5}
            >
              <Popup>
                {location.suitability}
              </Popup>
            </Circle>
          );
        })}

        {
          waypoints &&
          <>
            <AddMarker />
            {waypoints?.map((point, idx) => (
              <Marker key={idx} position={point}>
                <Popup>Waypoint {idx + 1}</Popup>
              </Marker>
            ))}
            {waypoints.length > 1 && <Polyline positions={waypoints} color="blue" />}
          </>
        }

      </MapContainer>
    </div>
  );
};

export default MapReview;