"use client"
import fetchCurrentWeather, { getWeatherForLocations } from '@/components/requests/fetchWeather';
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

  const fetchData = async () => {
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
    <div className='my-20'>
      <form onSubmit={fetchData} className='p-3 shadow-xl rounded-lg border border-gray-300 flex items-center gap-3 w-1/3 m-auto'>
        <input type="text" onChange={handleSearch} value={search} className='w-full focus:outline-none py-2 bg-transparent' placeholder='Search for location'/>
        <RiSearch2Line onClick={fetchData}/>
      </form>

      {
        weatherData && regions
        &&
        <>
          <Overview locationData={search} weatherData={weatherData} />
          <LazyMap region={search} regions={regions} weatherData={weatherData} />
        </>
      }

    </div>
  )
}

export default page