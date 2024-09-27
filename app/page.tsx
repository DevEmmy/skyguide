"use client"
import LocationSearch from "@/components/Search/Location";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Overview from "@/components/Weather/Overview";
import GeoLocator from "@/components/GeoLocation";
import fetchCurrentWeather, { fetchAllRegions, getWeatherForEachLocation, getWeatherForLocations } from "@/components/requests/fetchWeather";
import {  generateRandomLatLngAround } from "@/components/utils/generateLngNLat";
import { processWeatherData } from "@/components/utils/processWeather";
import Loader from "@/components/Reusables/Loader";

const LazyMap = dynamic(() => import("@/components/Weather/MapReview"), {
  ssr: false,
  loading: () => { return (<Loader />)} ,
});

interface weatherProps {
  temperature: number;
  windSpeed: number;
  windDirection: string,
  rainChances: {
    text: string,
    icon: string,
  }
}

function Home() {
  const [search, setSearch] = useState("")
  const [weatherData, setWeatherData] = useState<weatherProps>();
  const [regions, setRegions] = useState<any>()

  const {error, location} = GeoLocator()

  useEffect(()=>{
    let currentData = async ()=>{
      let data = await getWeatherForEachLocation(location);
      
      setSearch(data.location.name)
      setWeatherData({
        temperature: data?.current.temp_c,
        windSpeed: data?.current.wind_kph,
        windDirection: data?.current.wind_dir,
        rainChances: {
          text: data?.current.condition.text,
          icon: data?.current.condition.icon,
        }
      })
     

      let res = generateRandomLatLngAround(data.location.lat, data.location.lon )
      let weatherData = await getWeatherForLocations(res)
      
      weatherData = processWeatherData(weatherData);
      
      setRegions(weatherData);
    }

    if(location){
      currentData()
    }
    
  },[location])


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
     

      let res = generateRandomLatLngAround(resData.location.lat, resData.location.lon )
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
    <main>
      <div className="bg-sky h-[70vh]">
        <NavBar />

        <div className="my-20 w-1/2 mx-auto text-center text-white flex flex-col gap-5">
          <p className=" text-center text-4xl font-semibold text-white">Your Flight. Your Sky. Your Weather.</p>
          <p className="text-[16px]">
            Get real-time, precise weather forecasts from multiple sources, and plan your perfect flight with ease. Stay safe, fly smart, and explore the skies with confidence.
          </p>
        </div>
      </div>

      <LocationSearch search={search} handleSearch={handleSearch} handleSubmit={fetchData} />
      {
        weatherData && regions
        &&
        <>
          <Overview locationData={search} weatherData={weatherData} />
          <LazyMap region={search} regions={regions} weatherData={weatherData} />
        </>
      }
      {/* <APIsSourceToggle /> */}
    </main>
  );
}


export default Home