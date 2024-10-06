"use client"
import LocationSearch from "@/components/Search/Location";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Overview from "@/components/Weather/Overview";
import GeoLocator from "@/components/GeoLocation";
import fetchCurrentWeather, { fetchAllRegions, getWeatherForEachLocation, getWeatherForLocations } from "@/components/requests/fetchWeather";
import { generateRandomLatLngAround } from "@/components/utils/generateLngNLat";
import { processWeatherData } from "@/components/utils/processWeather";
import Loader from "@/components/Reusables/Loader";
import GoogleMap from "@/components/Weather/GoogleMap";

const LazyMap = dynamic(() => import("@/components/Weather/MapReview"), {
  ssr: false,
  loading: () => { return (<Loader />) },
});

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

function Home() {
  const [search, setSearch] = useState("")
  const [weatherData, setWeatherData] = useState<weatherProps>();
  const [regions, setRegions] = useState<any>();
  const [waypoints, setWaypoints] = useState<any>([]);
  const [flightParams, setFlightParams] = useState(null);

  const {location, error}  = GeoLocator();

  // const loc = useLocation();


  useEffect(() => {
    let currentData = async () => {
      let data = await getWeatherForEachLocation(location);

      setSearch(location?.city as string)
      setWeatherData({
        temperature: data?.current.temp_c,
        windSpeed: data?.current.wind_kph,
        windDirection: data?.current.wind_dir,
        humidity: data?.current.humidity,
        gust_kph: data?.current.gust_kph,
        vis_km: data?.current.vis_km,
        precip_mm: data?.current.precip_mm,
        rainChances: {
          text: data?.current.condition.text,
          icon: data?.current.condition.icon,
        }
      })


      let res = generateRandomLatLngAround(data.location.lat, data.location.lon)
      let weatherData = await getWeatherForLocations(res)

      weatherData = processWeatherData(weatherData);

      setRegions(weatherData);
      
    }

    if (location) {
      currentData()
    }

  }, [location])


  const fetchData = async () => {
    try {
      const resData = await fetchCurrentWeather(search);
      // console.log(resData);
      setWeatherData({
        temperature: resData?.current.temp_c,
        windSpeed: resData?.current.wind_kph,
        windDirection: resData?.current.wind_dir,
        humidity: resData?.current.humidity,
        gust_kph: resData?.current.gust_kph,
        vis_km: resData?.current.vis_km,
        precip_mm: resData?.current.precip_mm,
        rainChances: {
          text: resData?.current.condition.text,
          icon: resData?.current.condition.icon,
        }
      })


      let res = generateRandomLatLngAround(resData.location.lat, resData.location.lon)
      let weatherData = await getWeatherForLocations(res)
      // console.log(weatherData)
      weatherData = processWeatherData(weatherData);

      setRegions(weatherData);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[search])



  const handleSearch = (e: any) => {
    setSearch(e.target.value);

  }

  return (
    <main>

      {/* <Loader /> */}


      <LocationSearch search={search} handleSearch={handleSearch} handleSubmit={fetchData} />
      {
        weatherData && regions
        &&
        <>
          <Overview locationData={`current data : ${search}`} weatherData={weatherData} />
          <GoogleMap region={search} regions={regions} />
          {/* <LazyMap region={search} regions={regions} weatherData={weatherData}  waypoints={waypoints} setWaypoints={setWaypoints} /> */}
        </>
      }
      {/* <APIsSourceToggle /> */}

      {/* <Loader /> */}

      {/* <input type='datetime-local' /> */}


      <section id="latest-updates" className="updates-section">
        <div className="container">
          <h2 className="text-lg">Latest Updates</h2>
          <div className="updates-grid">
            <div className="update-card">
              <img src="https://3.files.edl.io/19e3/19/04/16/181536-8710c5d7-51fb-44ae-b218-6489ea724926.png" alt="" />
              <h3>Weather Update: Calm Skies for the Weekend</h3>
              <p>Perfect conditions for flying this weekend with clear skies and low wind speed. Don't miss the chance to take flight.</p>
            </div>
            <div className="update-card">
              <img src="https://img.onmanorama.com/content/dam/mm/en/travel/travel-news/images/2023/3/24/paragliding-1.jpg.transform/576x300/image.jpg" alt="" />
              <h3>Flight Planning Tips for New Pilots</h3>
              <p>Are you new to flying? Check out our beginner's guide to planning the perfect paragliding flight.</p>
            </div>
            <div className="update-card">
              <img src="https://www.pediatricsoffranklin.com/wp-content/uploads/2021/03/Severe-Weather-768x494.jpg" alt="" />
              <h3>Weather Warning: High Winds Expected Next Week</h3>
              <p>Be cautious as high winds are expected starting Monday. Stay updated with the latest forecasts.</p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}


export default Home