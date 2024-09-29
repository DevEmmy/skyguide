import React from 'react';
import NavBar from '../NavBar';

const Header = () => {
  return (
    <div className='bg-sky h-[60vh] md:h-[70vh]'>
      <NavBar />

      <div className='my-8 md:my-20 w-4/5 md:w-2/3 lg:w-1/2 mx-auto text-center text-white flex flex-col gap-3 md:gap-5'>
        <p className=' text-center text-3xl lg:text-4xl font-semibold text-white'>
          Your Flight. Your Sky. Your Weather.
        </p>
        <p className='text-[16px]'>
          Get real-time, precise weather forecasts from multiple sources, and
          plan your perfect flight with ease. Stay safe, fly smart, and explore
          the skies with confidence.
        </p>
      </div>
    </div>
  );
};

export default Header;
