'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import React, {useState, useEffect} from 'react'
import Heatmap from './Heatmap'
import {EarthquakesGeojson, loadEarthquakeGeojson} from './earthquakes';
import ControlPanel from './control-panel';

const GoogleMap = ({regions, region} : any) => {
    const [radius, setRadius] = useState(25);
    const [opacity, setOpacity] = useState(0.8);
    const [earthquakesGeojson, setEarthquakesGeojson] =
    useState<EarthquakesGeojson>();

    useEffect(() => {
        loadEarthquakeGeojson().then(data => setEarthquakesGeojson(data));
    }, []);
  return (
    <div className="section overflow-x-hidden my-10 flex flex-col gap-5">
        <p className="text-[28px] font-bold">This is the Map Display for the Location - {region}</p>
    <APIProvider apiKey="AIzaSyAUfYI1dWp9ox12hg_kU_oi2zEUW-Aci1E">    
        <Map
          style={{width: '100', height: '500px'}}
          defaultCenter={{lat: regions[25].lat, lng: regions[0].lng}}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={true}/>

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
        
    </APIProvider>
    </div>
  )
}

export default GoogleMap