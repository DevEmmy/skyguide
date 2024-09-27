import axios from "axios";
import weatherApiConfig from "./weatherApiConfig";
const key = process.env.NEXT_PUBLIC_API_KEY;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;



const fetchCurrentWeather = async (location : any) => {
  // alert(baseURL)
  try {
    const response = await axios.get(`${baseURL}current.json?key=${key}`, {
      params: {
        q: location,
        aqi: 'yes',
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const searchCurrentWeather = async (location : any) => {
  // alert(baseURL)
  try {
    const response = await axios.get(`${baseURL}search.json?key=${key}`, {
      params: {
        q: location,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const fetchAllRegions = async (region: string)=>{
  try{
    let response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${region}&format=json&polygon_geojson=1`)
    let data = response.data
    let regions = data[0].geojson.coordinates[0][0]
    // console.log(regions)

    let weatherResponse = await getWeatherForLocations(regions);
    console.log(weatherResponse)
  }
  catch(err){
    console.log(err)
  }
}

async function getWeatherForLocations(locations: any) {
  const weatherData = await Promise.all(
    locations.map(async ([lat, lon]: any) => {
      const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},%20mmm${lon}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data for location: ${lat}, ${lon}`);
        }
        const data = await response.json();
        return {
          location: data.location.name,
          region: data.location.region,
          country: data.location.country,
          lat: data.location.lat,
          lon: data.location.lon,
          temp_c: data.current.temp_c,
          condition: data.current.condition.text,
          wind_kph: data.current.wind_kph,
          humidity: data.current.humidity,
        };
      } catch (error) {
        console.error(`Failed to fetch weather for [${lat}, ${lon}]:`, error);
        return { error: `Failed to fetch weather for [${lat}, ${lon}]` };
      }
    })
  );
  return weatherData;
}

export default fetchCurrentWeather;

