'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiSearch2Line, RiUserLocationLine } from 'react-icons/ri';
import Overview from '../Weather/Overview';


const LocationSearch = ({ search, handleSearch, handleSubmit }: any) => {

  return (
    <div className="section flex flex-col gap-2 place-items-center justify-center -mt-10 md:-mt-20 border-xl">
      {/* <div className=' border md:w-3/5 bg-white rounded-xl'> */}
      <div className=' border md:w-2/3 lg:w-1/2 bg-white rounded-xl'>
        {/* <Overview locationData={search} weatherData={}/> */}
        <div className='flex justify-between  py-2 px-3 rounded-xl border m-2'>
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search for location"
            className="w-full px-4 py-2 text-gray-700 outline-0 grow"
          />
          <button
            onClick={handleSubmit}
            className="bgblue-500 bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded">
            <RiSearch2Line />
          </button>
        </div>
        <div className='bg-secondary/90 py-7 px-4 rounded-b-xl text-white flex flex-col '>
          <p className='flex gap-1.5 items-center'>
            <RiUserLocationLine />  Find out about the sky conditions instantly
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;