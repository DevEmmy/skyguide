'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiSearch2Line, RiUserLocationLine } from 'react-icons/ri';
import Overview from '../Weather/Overview';

const LocationSearch = () => {
  const [location, setLocation] = useState('');
  const [autoDetect, setAutoDetect] = useState(false);

    const handleAutoDetectClick = () => {
        
    }

  return (
    <div className="section flex flex-col gap-2 place-items-center justify-center -mt-20 border-xl">
      <div className=' border md:w-3/5 bg-white rounded-xl'>
        <Overview />
        <div className='flex justify-between  py-2 px-3 rounded-xl border m-2'>
          <input
            type="text"
            value={location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value) }
            placeholder="Search for location"
            className="w-full px-4 py-2 text-gray-700 outline-0 grow"
          />
          <button
            onClick={handleAutoDetectClick}
            className="bgblue-500 bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded">
            <RiSearch2Line />
          </button>
        </div>
        <div className='bg-secondary/90 py-8 px-4 rounded-b-xl text-white'>
         <p className='flex gap-1.5 items-center'>
          <RiUserLocationLine />  Find out about the sky conditions instantly
         </p>
         <p>
          Get a free online estimate of your local weather current condition in minutes
         </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;