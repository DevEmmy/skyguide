import React from 'react';

const DayWeatherTable = ({ date,weatherData }: any) => {
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
    // 'Precipitation (mm)',
    // 'Precipitation (in)',
    'Wind Direction',
    // 'Wind Gust (mph)',
    'Wind Gust (kph)',
    // 'UV Index',
    'Visibility (km)',
    // 'Visibility (miles)',
  ];
  return (
    <div className='my-10 flex flex-col gap-3 overflow-scroll'>
      <p className='text-center'> Forecasted weather data for <span>
        <em>{date}</em>
        </span></p>
      <table className='table overflow-x-scroll whitespace-nowrap text-xs table-auto'>
        <thead>
          <tr className='text-center'>
            {tableHeaders?.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weatherData?.map((row: any, index: number) => (
            <tr key={index} className='text-center'>
              <td>{row.time}</td>
              <td>{row.temp_c}</td>
              {/* <td>{row.temp_f}</td> */}
              <td className='flex items-center gap-0.5'>
                <img src={row?.condition?.icon} className='size-5 md:size-8' />{' '}
                {row.condition.text}{' '}
              </td>
              {/* <td>{row.wind_mph}</td> */}
              <td>{row.wind_kph}</td>
              <td>{row.humidity}</td>
              <td>{row.cloud}</td>
              <td>{row.feelslike_c}</td>
              {/* <td>{row.feelslike_f}</td> */}
              {/* <td>{row.precip_mm}</td> */}
              {/* <td>{row.precip_in}</td> */}
              <td>{row.wind_dir}</td>
              {/* <td>{row.gust_mph}</td> */}
              <td>{row.gust_kph}</td>
              {/* <td>{row.uv}</td> */}
              <td>{row.vis_km}</td>
              {/* <td>{row.vis_miles}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayWeatherTable;
