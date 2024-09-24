'use client';
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";

import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

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

const MapReview = ({ region }: any) => {
  const [weatherData, setWeatherData] = useState({
    temperature: '36',
    windSpeed: '260',
    windDirection: '35 Nw',
    rainChances: '26.5'
  });

  const center: [number, number] = [51.505, -0.09]; // Example latitude and longitude

  const position = [51.505, -0.09]
  const locations = [
    { name: 'Safe Location ', position: [51.505, -0.09], safe: true },
    { name: 'Unsafe Location ', position: [51.51, -0.1], safe: false },
    { name: 'Safe Location', position: [51.52, -0.12], safe: true },
    { name: 'Unsafe Location ', position: [51.5, -0.08], safe: false },
  ];
  return (
    <div className='mx-[5%] my-10 flex flex-col gap-5' id="map">
      <p className="text-[28px] font-bold">
        This is the Map Display for the Location - {region}
      </p>

      <div className="flex items-center gap-3">
        <div className="bg-red-400 h-[30px] w-[30px] rounded-full" />
        <p>Indicates unsafe area</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-blue-400 h-[30px] w-[30px] rounded-full" />
        <p>Indicates safe area</p>
      </div>

      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Circle
            key={index}
            center={location.position}
            radius={500} // Adjust the radius as needed
            color={location.safe ? 'blue' : 'red'} // Use blue for safe, red for unsafe
            fillOpacity={0.5}
          >
            <Popup>
              {location.name}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapReview;