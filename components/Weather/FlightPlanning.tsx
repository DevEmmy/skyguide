'use client';
import React, {useState, useEffect} from 'react'

const FlightPlanning = () => {
    const [totalDistance, setTotalDistance] = useState<number>(0); // Total flight distance
    const [glideRatio, setGlideRatio] = useState<number>(0); // Glide ratio input
    const [airspeed, setAirspeed] = useState<number>(0); // Airspeed input (km/h)
    const [flightTime, setFlightTime] = useState<number>(0); // Time of flight
    const [flightShareUrl, setFlightShareUrl] = useState<string>(''); // Flight share URL

    const handleShareFlight = () => {
        // const pathData = flightPath.map(point => `lat=${point.lat}&lng=${point.lng}`)
      };
  return (
    <div>
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
    </div>
  )
}

export default FlightPlanning