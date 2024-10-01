'use client';
import "leaflet/dist/leaflet.css";

import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLng } from "leaflet";
import { useMap } from "react-leaflet";

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

interface MapCentreProps {
  mapCentre: LatLng;
}

interface newCoords {
  changedCoords: {
    lat : number
    lng: number
  }
}

function UpdateMapCentre(props: MapCentreProps) {
  const map = useMap();
  map.panTo(props.mapCentre);
  return null;
}

const MapReview = ({ region, regions, waypoints, setWaypoints }: any) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const [weatherData, setWeatherData] = useState({
    temperature: '36',
    windSpeed: '260',
    windDirection: '35 Nw',
    rainChances: '26.5'
  });

const [changedCoords, setChangedCoords] = useState<any>({
    lat: 0,
    lng: 0,
  });



  const center: [number, number] = [51.505, -0.09]; // Example latitude and longitude

  const position = [51.505, -0.09]

  const AddMarker = () => {
    useMapEvents({
      click(e) {
        const newWaypoint = [e.latlng.lat, e.latlng.lng];
        setWaypoints((prevWaypoints : any) => [...prevWaypoints, newWaypoint]);
      }
    });
    return null;
  };

  useEffect(() => {
    setChangedCoords({
      lat: regions[25].lat,
      lng: regions[0].lng,
    });

    // AddMarker();
    
  },[regions])

  return (
    <div className='mx-[5%] my-10 flex flex-col gap-5' id="map">
      <p className="text-[28px] font-bold">
        This is the Map Display for the Location - {region}
      </p>


      <MapContainer center={[regions[25].lat, regions[0].lng]} zoom={13} className="h-[500px] relative">
      <TileLayer attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          url="https://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=f09b466c383d46dc9b9122918242309"
          opacity={0.5}
          maxZoom={18}
          minZoom={2}
          subdomains={['a','b','c']}
          zIndex={10000}
          
        /> 
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UpdateMapCentre mapCentre={changedCoords} />
        
          <div className='bg-white/80 shadow-2xl text-secondary glass flex flex-col gap-2 border rounded absolute top-0 p-2 right-0 z-[1000]'>
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
            {waypoints?.map((point : any, idx : number) => (
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