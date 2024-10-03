'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import React, {useState, useEffect, useMemo} from 'react'
import Heatmap from './Heatmap'
import {EarthquakesGeojson, loadEarthquakeGeojson} from './earthquakes';
import ControlPanel from './control-panel';
import { useMap } from '@vis.gl/react-google-maps';


const GoogleMap = ({regions, region} : any) => {
  const [data, setData] = useState<any[]>([]);
    const [radius, setRadius] = useState(25);
    const [opacity, setOpacity] = useState(0.8);
    const [changedCoords, setChangedCoords] = useState<any>({
      lat: regions[25].lat,
      lng: regions[0].lng,
    });
    const [earthquakesGeojson, setEarthquakesGeojson] =
    useState<EarthquakesGeojson>();

    useEffect(() => {
        loadEarthquakeGeojson().then(data => setEarthquakesGeojson(data));
    }, []);

    useEffect(() => {
      setChangedCoords({
        lat: regions[25].lat,
        lng: regions[0].lng
      })
      // Simulate live data feed for heatmap
      const interval = setInterval(() => {
        const newPoint = {
          position: [changedCoords.lng + Math.random() * 0.01, changedCoords.lat + Math.random() * 0.01],
          weight: Math.random() * 100,
        };
        setData((prevData) => [...prevData, newPoint]);
      }, 1000); // Add a new point every second
  
      return () => clearInterval(interval);
    }, []);
    
  return (
    <div className="section overflow-x-hidden my-10 flex flex-col gap-5">
        <p className="text-[28px] font-bold">This is the Map Display for the Location - {region}</p>
    <APIProvider apiKey="AIzaSyAUfYI1dWp9ox12hg_kU_oi2zEUW-Aci1E">    
        <Map
          style={{width: '100', height: '500px'}}
          defaultCenter={{lat: changedCoords.lat, lng: changedCoords.lng}}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={true}>

            <div className='bg-white/80 shadow-2xl text-secondary glass flex flex-col gap-2 border rounded absolute top-0 p-2 left-0 z-[1000]'>
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

            {earthquakesGeojson && (
                <Heatmap
                geojson={earthquakesGeojson}
                radius={radius}
                opacity={opacity}
                />
            )}

    <ControlPanel
        radius={radius}
        opacity={opacity}
        onRadiusChanged={setRadius}
        onOpacityChanged={setOpacity}
      />
      {/* <DeckGlOverlay layers={deckGlLayers} /> */}

      </Map>
        
    </APIProvider>
    </div>
  )
}

export default GoogleMap