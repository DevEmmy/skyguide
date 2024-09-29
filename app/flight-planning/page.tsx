"use client"
import fetchCurrentWeather, { getWeatherForLocations } from '@/components/requests/fetchWeather';
import FlightParameters from '@/components/Reusables/FlightParameters';
import FlightSimulation from '@/components/Reusables/FlightSimulation';
import Loader from '@/components/Reusables/Loader';
import { generateRandomLatLngAround } from '@/components/utils/generateLngNLat';
import { processWeatherData } from '@/components/utils/processWeather';
import Overview from '@/components/Weather/Overview';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const LazyMap = dynamic(() => import("@/components/Weather/MapReview"), {
  ssr: false,
  loading: () => { return (<Loader />) },
});

const page = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<any>();
  const [regions, setRegions] = useState<any>()
  const [waypoints, setWaypoints] = useState([]);
  const [flightParams, setFlightParams] = useState(null);

  const handleParametersSubmit = (params) => {
    setFlightParams(params);
  };

  const fetchData = async (e) => {
    e.preventDefault()

    try {
      const resData = await fetchCurrentWeather(search);
      console.log(resData);
      setWeatherData({
        temperature: resData?.current.temp_c,
        windSpeed: resData?.current.wind_kph,
        windDirection: resData?.current.wind_dir,
        rainChances: {
          text: resData?.current.condition.text,
          icon: resData?.current.condition.icon,
        }
      })


      let res = generateRandomLatLngAround(resData.location.lat, resData.location.lon)
      let weatherData = await getWeatherForLocations(res)
      console.log(weatherData)
      weatherData = processWeatherData(weatherData);

      setRegions(weatherData);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  }


  return (
    <div className='mb-20 flex flex-col gap-4 -mt-10 md:-mt-20'>
      <form onSubmit={fetchData} className='p-3 shadow-xl bg-white rounded-lg border border-gray-300 flex items-center gap-3 md:2/3 lg:w-1/3 m-auto'>
        <input type="text" onChange={handleSearch} value={search} className='w-full focus:outline-none py-2 bg-transparent' placeholder='Search for location' />
        <RiSearch2Line onClick={fetchData} />
      </form>

      {
        weatherData && regions
        &&
        <>
          <Overview locationData={search} weatherData={weatherData} />
          <LazyMap region={search} regions={regions} weatherData={weatherData} waypoints={waypoints} setWaypoints={setWaypoints} />
        </>
      }

      <div className='px-[5%]'>
        <FlightParameters onSubmit={handleParametersSubmit} />

        <FlightSimulation waypoints={waypoints} flightParams={flightParams} />
      </div>

    </div>
  )
}

export default page