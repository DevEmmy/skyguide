'use client';

const Overview = ({locationData, weatherData} : any) => {
  return (
    <div className='section mt-6 flex flex-col gap-3 max-w-full'>
      <h1 className='text-2xl px-1.5'>{locationData}</h1>
      {locationData && (
        <ul className='flex gap-3 items-center justify-between overflow-x-auto whitespace-nowrap text-xs md:text-sm divide-x-2 text-gray-600 scrollbar-thin'>
          <li className=''>Temperature: {weatherData?.temperature}°C</li>
          <li className=''>Wind Speed: {weatherData?.windSpeed} km/h</li>
          <li className=''>Wind Direction: {weatherData?.windDirection}</li>
          <li className=''>Humidity: {weatherData?.humidity}</li>
          <li className=''>Gust: {weatherData?.gust_kph} km/h</li>
          <li className=''>Visibility: {weatherData?.vis_km} km</li>
          <li className=''>Precipitation: {weatherData?.precip_mm} mm</li>
          <li className='flex items-center gap-1'> <img src={weatherData?.rainChances?.icon} className='size-5 md:size-8' /> {weatherData?.rainChances?.text}</li>
        </ul>
      )}
    </div>
  );
};

export default Overview;