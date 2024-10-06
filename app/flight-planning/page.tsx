"use client"
import fetchCurrentWeather, { fetchFutureWeather, getWeatherForLocations } from '@/components/requests/fetchWeather';
import Loader from '@/components/Reusables/Loader';
import { generateRandomLatLngAround } from '@/components/utils/generateLngNLat';
import { processWeatherData } from '@/components/utils/processWeather';
import Overview from '@/components/Weather/Overview';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const LazyMap = dynamic(() => import("@/components/Weather/MapReview"), {
  ssr: false,
  loading: () => { return (<Loader />) },
});


const page = () => {
  const [search, setSearch] = useState("");
  const [date,setDate] = useState();
  const [time,setTime] = useState<any>();
  const [dateTime,setDateTime] = useState<string>();
  const [weatherData, setWeatherData] = useState<any>();
  const [regions, setRegions] = useState<any>()
  const [waypoints, setWaypoints] = useState([]);
  const [flightParams, setFlightParams] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');


   useEffect(() => {
    const today = new Date();
    const minDateCalc = new Date(today);
    minDateCalc.setDate(minDateCalc.getDate() + 20);
    const maxDateCalc = new Date(today);
    maxDateCalc.setDate(maxDateCalc.getDate() + 300);

    setMinDate(minDateCalc.toISOString().split('T')[0]);
    setMaxDate(maxDateCalc.toISOString().split('T')[0]);
  }, []);

  const handleParametersSubmit = (params : any) => {
    setFlightParams(params);
  };

  const fetchData = async (e : any) => {
    e.preventDefault()

    setDateTime(`${date} ${time}`)


    try {
      const resData = await fetchFutureWeather(search, date, dateTime);
      console.log(resData);
      let dataVal = resData?.forecast?.forecastday[0]?.hour;
      // setWeatherData({
      //   temperature: dataVal?.hour.temp_c,
      //   windSpeed: dataVal?.hour.wind_kph,
      //   windDirection: 'N',
      //   rainChances: {
      //     text: dataVal?.day.condition.text,
      //     icon: dataVal?.day.condition.icon,
      //   }
      // })
      const hourData = dataVal.find((item : any) => item.time === dateTime);
      setWeatherData(dataVal);
      // console.log(weatherData);
      console.log(hourData);


      // let res = generateRandomLatLngAround(resData.location.lat, resData.location.lon)
      // let weatherData = await getWeatherForLocations(res)
      // console.log(weatherData)
      // weatherData = processWeatherData(weatherData);

      // setRegions(weatherData);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  }

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

  const tableHeaders = [
    'Time',
    'Temperature (C)',
    // 'Temperature (F)',
    'Condition',
    // 'Wind (mph)',
    'Wind (kph)',
    'Humidity',
    'Cloud',
    'Feels Like (C)',
    // 'Feels Like (F)',
    'Precipitation (mm)',
    // 'Precipitation (in)',
    'Wind Direction',
    // 'Wind Gust (mph)',
    'Wind Gust (kph)',
    'UV Index',
    'Visibility (km)',
    // 'Visibility (miles)',
  ];

  return (
    <>
      <div className='mb-20 flex flex-col gap-4 -mt-10 md:-mt-20'>
        <form onSubmit={fetchData} className='p-3 shadow-xl bg-white rounded-lg border border-gray-300 flex items-center gap-3 md:2/3 lg:w-1/3 m-auto'>
          <input type="text" onChange={handleSearch} value={search} className='w-full focus:outline-none py-2 bg-transparent' placeholder='Search for location' />
          <input type='date' value={date} onChange={handleDateChange}  min={minDate} max={maxDate}  />
          <input type='time' step={3600} value={time} onChange={handleTimeChange} />
          <RiSearch2Line onClick={fetchData} />
        </form>
      </div>

      {
        dateTime && (
         <p> {dateTime}</p>
        )
      }

      <div className='section'>
        <table className='table overflow-x-auto'>
          <thead>
            <tr className=''>
              {tableHeaders?.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {weatherData?.map((row : any, index : number) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td>{row.temp_c}</td>
              {/* <td>{row.temp_f}</td> */}
              <td className='flex'><img src={row?.condition?.icon} className='size-5 md:size-8' /> {row.condition.text} </td>
              {/* <td>{row.wind_mph}</td> */}
              <td>{row.wind_kph}</td>
              <td>{row.humidity}</td>
              <td>{row.cloud}</td>
              <td>{row.feelslike_c}</td>
              {/* <td>{row.feelslike_f}</td> */}
              <td>{row.precip_mm}</td>
              {/* <td>{row.precip_in}</td> */}
              <td>{row.wind_dir}</td>
              {/* <td>{row.gust_mph}</td> */}
              <td>{row.gust_kph}</td>
              <td>{row.uv}</td>
              <td>{row.vis_km}</td>
              {/* <td>{row.vis_miles}</td> */}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default page