'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
  const [weatherData, setWeatherData] = useState({
    temperature : '36',
    windSpeed : '260',
    windDirection : '35 Nw',
    rainChances : '26.5'
  });



  return (
    <div className='mx-2 mt-2'>
      {/* <h1 className='text-2xl'>Current Weather</h1> */}
      <ul className='flex gap-2 overflow-x-auto text-sm divide-x-2 divide-double text-gray-600'>
        <li className='px-3'>Temperature: {weatherData.temperature}°C</li>
        <li className='px-3'>Wind Speed: {weatherData.windSpeed} km/h</li>
        <li className='px-3'>Wind Direction: {weatherData.windDirection}</li>
        <li className='px-3'>Rain Chances: {weatherData.rainChances}%</li>
      </ul>
    </div>
  );
};

export default Overview;