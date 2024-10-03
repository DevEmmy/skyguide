'use client';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Circle, LayersControl, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLng } from "leaflet";

const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface WindData {
  lat: number;
  lng: number;
  windSpeed: number;
  windDirection: number; // Degrees (0-360)
}

const MapComponent = ({regions, region} : any) => {
  const [windData, setWindData] = useState<WindData[]>([]);

  useEffect(() => {
    // Fetch wind data (you can fetch real wind data from a weather API or use dummy data)
    const data: WindData[] = [
      { lat: 51.505, lng: -0.09, windSpeed: 20, windDirection: 45 }, // wind blowing to NE
      { lat: 51.515, lng: -0.08, windSpeed: 15, windDirection: 90 }, // wind blowing to E
      { lat: 51.525, lng: -0.07, windSpeed: 10, windDirection: 135 }, // wind blowing to SE
    ];
    setWindData(data);
  }, []);

  const createWindPolylines = (data: WindData) => {
    const { lat, lng, windDirection, windSpeed } = data;
    const startPoint = new LatLng(lat, lng);

    const distance = windSpeed * 100; // Scale the distance
    const angleInRadians = (windDirection - 90) * (Math.PI / 180); // Convert degrees to radians

    const endPoint = new LatLng(
      lat + (distance / 111000) * Math.cos(angleInRadians), // Convert distance to lat-long degrees
      lng + (distance / 111000) * Math.sin(angleInRadians)
    );

    return [startPoint, endPoint];
  };

  return (
    // <div className='mx-[5%] my-10 flex flex-col gap-5' id="map">
    //   <p className="text-[28px] font-bold">
    //     This is the Map Display for the Location - {region}
    //   </p>


    //   <MapContainer center={[regions[25].lat, regions[0].lng]} zoom={13} className="h-[500px] relative">

    //     <LayersControl>
    //     <LayersControl.BaseLayer name="base" checked>
    //       <TileLayer
    //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //       <UpdateMapCentre mapCentre={changedCoords} />
    //   </LayersControl.BaseLayer>

    //     </LayersControl>

        
    //       <div className='bg-white/80 shadow-2xl text-secondary glass flex flex-col gap-2 border rounded absolute top-0 p-2 right-0 z-[1000]'>
    //         <div className="flex items-center gap-3">
    //           <div className="bg-red-600 h-[15px] w-[15px] rounded-full" />
    //           <p>Unsafe area</p>
    //         </div>
    //         <div className="flex items-center gap-3">
    //           <div className="bg-yellow-400 h-[15px] w-[15px] rounded-full" />
    //           <p>Quite safe area</p>
    //         </div>
    //         <div className="flex items-center gap-3">
    //           <div className="bg-green-600 h-[15px] w-[15px] rounded-full" />
    //           <p>Safe area</p>
    //         </div>
    //       </div>
    //     {regions?.map((location: any, index: number) => {
    //       let circleColor;

    //       // Set the color based on the rating
    //       if (location.rating < 3) {
    //         circleColor = 'red'; // Unsafe area
    //       } else if (location.rating === 3) {
    //         circleColor = 'yellow'; // Neutral area
    //       } else {
    //         circleColor = 'green'; // Safe area
    //       }

    //       return (
    //         <>
    //           <Polyline key={idx} positions={windPolyline} color="blue">
    //             <Popup>
    //               Wind speed: {data.windSpeed} m/s<br />
    //               Wind direction: {data.windDirection}°
    //             </Popup>
    //           </Polyline>

    //           {/* Use PolylineDecorator to add arrows */}
    //           <L.polylineDecorator
    //             positions={windPolyline}
    //             patterns={[
    //               {
    //                 offset: '100%',
    //                 repeat: 0,
    //                 symbol: L.Symbol.arrowHead({
    //                   pixelSize: 15,
    //                   polygon: false,
    //                   pathOptions: { stroke: true, color: 'red' }
    //                 }),
    //               },
    //             ]}
    //           />
    //         </>
    //       );
    //     })}
    //   </MapContainer>
    // </div>
    <div>
      tunji
    </div>
  );
};

export default MapComponent;
