'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Polyline, HeatmapLayer, GoogleMapProps } from '@react-google-maps/api';
import MapIndicator from './MapIndicator';
import generatePDF, { Margin, Options, Resolution, usePDF } from "react-to-pdf";
import { fetchFutureWeather, getWeatherForLocations } from '../requests/fetchWeather';

import Overview from './Overview';
import DayWeatherTable from './DayWeatherTable';
import ShareFlightPlan from './ShareFlightPlan';
import { RiDownload2Fill } from 'react-icons/ri';

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

interface weatherProps {
  temperature: number;
  windSpeed: number;
  windDirection: string,
  humidity: string,
  gust_kph: number,
  vis_km: number,
  precip_mm: number,
  rainChances: {
    text: string,
    icon: string,
  }
}

const GoogleMapComponent = ({ regions, region }: any) => {
  const [date,setDate] = useState(); // predict weather data for future dates
  const [time,setTime] = useState<string>(); // predict time on future date
  const [dateTime,setDateTime] = useState<string>();  // combine date and time
  const [showFlightPlan, setShowFlightPlan] = useState<boolean>(false);
  const [center,setCenter] = useState({ lat: regions[0].lat, lng: regions[0].lng });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [flightPath, setFlightPath] = useState<any[]>([]); // Array to store waypoints (turning points)
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total flight distance
  const [glideRatio, setGlideRatio] = useState<number>(0); // Glide ratio input
  const [airspeed, setAirspeed] = useState<number>(0); // Airspeed input (km/h)
  const [speedUnit,setSpeedUnit] = useState('kph');
  const [flightTime, setFlightTime] = useState<number>(0); // Time of flight
  const [flightShareUrl, setFlightShareUrl] = useState<string>(''); // Flight share URL
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [weatherData, setWeatherData] = useState<any>();
  const [hourData,setHourData] = useState<weatherProps>();
  const [isPdfSaving,setIsPdfSaving] = useState<boolean>(false);

  const airSpeedUnitData = [
    'kph','knots','mph'
  ]

  // UseEffect to update map
  useEffect(() => {

    setCenter({
      lat: regions[0].lat,
      lng: regions[0].lng
    })


  },[regions,region]);

  const fetchFutureData = async () => {
    try {
      const resData = await fetchFutureWeather(region, date, dateTime);
      console.log(resData);
      let dataVal = resData?.forecast?.forecastday[0]?.hour;
      const hourData = dataVal.find((item : any) => item.time === dateTime);

      setWeatherData(resData?.forecast?.forecastday[0]?.hour)

      setHourData(
        {
          temperature: hourData?.temp_c,
          windSpeed: hourData?.wind_kph,
          windDirection: hourData?.wind_dir,
          humidity: hourData?.humidity,
          gust_kph: hourData?.gust_kph,
          vis_km: hourData?.vis_km,
          precip_mm: hourData?.precip_mm,
          rainChances: {
            text: hourData?.condition.text,
            icon: hourData?.condition.icon,
          }
        }
      );

    } catch (error) {
      console.error(error);
    }
  }
  // Search for future data
  useEffect( () => {
    if (date !== '' && time !== '') {
      setDateTime(`${date} ${time}`)
    }
  },[date,time])

  useEffect(() => {
    fetchFutureData();

  },[dateTime]);

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
      speedUnit == 'kph' ? setFlightTime(totalDistance / airspeed) : speedUnit == 'knts' ? setFlightTime(totalDistance / (airspeed * 1.852001)) : setFlightTime(totalDistance / (airspeed * 1.609344));
    }
  }, [totalDistance, airspeed]);

  // Download flight plan
  const downloadPDF = async () => {
    await generatePDF(() => document.getElementById("container"), {
      method: "save",
      filename: `${region}-${dateTime}-flight-plan.pdf`,
      page: { margin: Margin.MEDIUM },
    });

    setIsPdfSaving(false);
  };

  // Generate shareable flight URL
  const handleShareFlight = (e: any) => {
    e.preventDefault();
    fetchFutureData();
    const pathData = flightPath.map(point => `lat=${point.lat}&lng=${point.lng}`).join('&');
    const shareUrl = `${window.location.origin}/share?${pathData}`;
    setFlightShareUrl(shareUrl);
    // downloadPDF();
  };

  const getWindMarkerIcon = (windDirection: number) => {
    return {
      path: 'M64 1 17.9 127 64 99.8l46.1 27.2L64 1zm0 20.4 32.6 89.2L64 91.3V21.4z', // Arrow path
      fillColor: 'brown',
      fillOpacity: 1,
      strokeWeight: 0.2,
      rotation: windDirection, // Rotate the SVG based on wind direction
      scale: 0.3, // Scale the arrow size
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
    border: '1px solid #7777',
  };

  const heatmapData = googleMapsReady
    ? regions?.map((location: any) => ({
        location: new window.google.maps.LatLng(location.lat, location.lng), // Use LatLng object only after Google Maps is ready
        weight: location.thermalIntensity, // Use intensity to control heatmap strength
      }))
    : [];

    useEffect(() => {
      const today = new Date();
      const minDateCalc = new Date(today);
      minDateCalc.setDate(minDateCalc.getDate() + 20);
      const maxDateCalc = new Date(today);
      maxDateCalc.setDate(maxDateCalc.getDate() + 300);
  
      setMinDate(minDateCalc.toISOString().split('T')[0]);
      setMaxDate(maxDateCalc.toISOString().split('T')[0]);
    }, []);

    const handleDateChange = (e : any) => {
      setDate(e.target.value);
    } 
    const handleTimeChange = (e: any) => {
      const newTime = e.target.value;
      const [hours, minutes] = newTime.split(':');
      
      // Pad hours and minutes with leading zeros if necessary
      const formattedHours = hours.padStart(2, '0');
      const formattedMinutes = '00';
      
      const formattedTime = `${formattedHours}:${formattedMinutes}`;
      
      console.log(formattedTime);
      setTime(formattedTime);
    };


  return (
    <div className="section overflow-x-hidden my-10 flex flex-col gap-5 relative" id='container'>
      <p className="text-[28px] font-bold">This is the Map Display for the Location - {region}</p>



      <LoadScript
        googleMapsApiKey="AIzaSyAUfYI1dWp9ox12hg_kU_oi2zEUW-Aci1E"
        libraries={['visualization']}  // Include the visualization library for HeatmapLayer
        onLoad={() => setGoogleMapsReady(true)}
      >

      {time && date && hourData &&  (
          <Overview locationData={dateTime} weatherData={hourData} />
        )
      }
        {/*Control Tabs  */}
        <div className="flex max-md:flex-col justify-between gap-1">
          <div className="flex gap-1 md:gap-2">
            <button className={`text-white px-2 md:px-3 py-2 items-center whitespace-nowrap flex w-fit ${showFlightPlan ? 'bg-blue-500' : 'bg-secondary'}`} onClick={() => setShowFlightPlan(!showFlightPlan)}>
              Flight planner
            </button>
            <input type='date' value={date} className='shadow w-fit px-2 md:px-3' onChange={handleDateChange}  min={minDate} max={maxDate}  />
            <input type='time' step={3600} className='shadow w-fit px-2 md:px-3' value={time} onChange={handleTimeChange} />
          </div>

          <div className='flex gap-2'>

            {
              airSpeedUnitData?.map((item: string, i: number) => {
                return (
                  <button
                    onClick={() => setSpeedUnit(item)}
                  className={`px-3 py-1 pt-2 flex w-fit text-white ${item == speedUnit ? 'bg-blue-500' : 'bg-secondary'}`} >
                    {item}
                  </button>
                )
              })
            }
          </div>
        </div>



        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13} // Adjust zoom level based on region size
          options={{ gestureHandling: 'greedy', disableDefaultUI: true, zoomControl: true, panControl: true, scaleControl : false, mapTypeControl: true, rotateControl: true, isFractionalZoomEnabled: false, fullscreenControl: true}}
          onClick={handleMapClick} // Handle map clicks to add waypoints
        >
          <MapIndicator />


          {
            showFlightPlan && (
              <div className='absolute left-4 bottom-0  '>
              {/* <div className='flex items-center gap-3'>
                <p>For Flight Planning</p>
                <input type="date" className='p-3'/>
              </div> */}

              {/* Flight Planning Input Section */}
              <form className="bg-white p-4 shadow-lg border rounded-lg my-4 text-sm flex flex-col gap-1 md:gap-2 max-w-[300px] overflow-hidden" onSubmit={handleShareFlight}>
                <div className="flex items-center">
                <h3 className="text-xl font-bold">Flight Planning</h3>
                </div>
               
                <div className="flex shrink items-center gap-3 my-1">
                  <label htmlFor="glide-ratio">Glide Ratio:</label>
                  <input 
                    type="number" 
                    id="glide-ratio"
                    className="border p-2 overflow-x-hidden shrink" 
                    value={glideRatio} 
                    onChange={(e) => setGlideRatio(Number(e.target.value))} 
                  />
                </div>

                <div className="flex items-center gap-3 my-1">
                  <label htmlFor="airspeed">Airspeed ({speedUnit}):</label>
                  <input 
                    type="number" 
                    id="airspeed"
                    className="border p-2 shrink overflow-x-hidden" 
                    value={airspeed} 
                    onChange={(e) => setAirspeed(Number(e.target.value))} 
                  />
                </div>

                <p>Total Distance: {totalDistance.toFixed(2)} km</p>

                {/* Display Estimated Glide Range */}
                {glideRatio > 0 && (
                  <p>Estimated Flight Range: {(totalDistance / glideRatio).toFixed(2)} km</p>
                )}

                {/* Display Time of Flight */}
                {flightTime > 0 && (
                  <p>Estimated Flight Time: {flightTime.toFixed(2)} hours</p>
                )}

                {/* Share Flight Button */}
                <div className='flex gap-2'>
                  <button 
                    // onClick={handleShareFlight}
                    type='submit'
                    className="mt-3 p-3 bg-blue-600 text-white rounded w-fit"
                  >
                    Share Flight Plan
                  </button>

                  {flightShareUrl && (
                    <button className="mt-3 p-3 bg-black/70 hover:bg-black/50 text-white rounded w-fit flex items-center gap-1" disabled={isPdfSaving} onClick={() => { setIsPdfSaving(true); downloadPDF();}}>
                      <RiDownload2Fill size={17}/>
                      </button>
                  )}
                </div>

                {/* <ShareFlightPlan /> */}

                {/* Display Share URL */}
                {flightShareUrl && (
                  <div className="">
                    
                    <p>Share this flight plan:</p>
                    <a href={flightShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline  overflow-x-auto text-balance">
                      {flightShareUrl}
                    </a>
                  </div>
                )}
              </form>
              </div>
            )
          }

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

            {/* Display wind direction lines and markers */}
            {regions?.map((location: any, idx: number) => (
            <React.Fragment key={idx}>
              {/* Draw a line indicating wind direction */}
              {/* <Polyline
                path={createWindLine(location)} // Get the path for the polyline
                options={{
                  strokeColor: 'red', // Color of the line
                  strokeOpacity: 0.3,
                  strokeWeight: 1,
                }}
              /> */}
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
          {
           date && time && (
            <DayWeatherTable date={date} weatherData={weatherData} />
          )
          }
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;