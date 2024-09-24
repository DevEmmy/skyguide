'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import fetchCurrentWeather from '../requests/fetchWeather';

interface weatherProps  {
    temperature : number;
    windSpeed: number;
    windDirection: string,
    rainChances: {
      text: string,
      icon: string,
    }
  }


const Overview = ({locationData} : any) => {
  const [weatherData, setWeatherData] = useState<weatherProps>({
    temperature : 0,
    windSpeed : 0,
    windDirection : '',
    rainChances : {
      text: '',
      icon: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetchCurrentWeather(locationData);
        console.log(resData);
        setWeatherData({
          temperature: resData?.current.temp_c,
          windSpeed: resData?.current.wind_kph,
          windDirection: resData?.current.wind_dir,
          rainChances: {
            text : resData?.current.condition.text,
            icon : resData?.current.condition.icon,
          }
        })

      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [locationData]);



  return (
    <div className='mx-[5%] mt-2'>
      <h1 className='text-2xl px-1.5'>{locationData}</h1>
      {locationData && (
        <ul className='flex items-center gap-2 overflow-x-auto text-xs md:text-sm divide-x-2 divide-double text-gray-600'>
          <li className='px-1.5'>Temperature: {weatherData.temperature}°C</li>
          <li className='px-1.5'>Wind Speed: {weatherData.windSpeed} km/h</li>
          <li className='px-1.5'>Wind Direction: {weatherData.windDirection}</li>
          <li className='px-1.5 flex items-center gap-1'> <img src={weatherData?.rainChances.icon} className='size-5 md:size-8' /> {weatherData.rainChances?.text}</li>
        </ul>
      )}
    </div>
  );
};

export default Overview;