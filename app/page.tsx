"use client"
import LocationSearch from "@/components/Search/Location";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import Overview from "@/components/Weather/Overview";
import GeoLocator from "@/components/GeoLocation";
import fetchCurrentWeather, { fetchAllRegions } from "@/components/requests/fetchWeather";
import {  generateRandomLatLngAround } from "@/components/utils/generateLngNLat";
import { processWeatherData } from "@/components/utils/processWeather";

const LazyMap = dynamic(() => import("@/components/Weather/MapReview"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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