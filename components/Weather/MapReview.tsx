'use client';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-polylinedecorator'; // Import the polylinedecorator to extend leaflet functionality
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';

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

const MapComponent = () => {
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
    <div className='map'>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="h-[500px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {windData.map((data, idx) => {
          const windPolyline = createWindPolylines(data);
          return (
            <>
              <Polyline key={idx} positions={windPolyline} color="blue">
                <Popup>
                  Wind speed: {data.windSpeed} m/s<br />
                  Wind direction: {data.windDirection}°
                </Popup>
              </Polyline>

              {/* Use PolylineDecorator to add arrows */}
              <L.polylineDecorator
                positions={windPolyline}
                patterns={[
                  {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({
                      pixelSize: 15,
                      polygon: false,
                      pathOptions: { stroke: true, color: 'red' }
                    }),
                  },
                ]}
              />
            </>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
