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

export const fetchFutureWeather = async (location : any , predictDate : any, time: any) => {
  // alert(baseURL)
  try {
    const response = await axios.get(`${baseURL}future.json?key=${key}`, {
      params: {
        q: location,
        dt: predictDate,
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

}

export async function getWeatherForLocations(locations: {lat: number, lng: number}[]) {
  const weatherData = await Promise.all(
    locations.map(async (reg) => {
      const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${reg.lat},${reg.lng}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data for location`);
        }
        const data = await response.json();
        // return {
        //   location: data.location.name,
        //   region: data.location.region,
        //   country: data.location.country,
        //   lat: data.location.lat,
        //   lon: data.location.lon,
        //   temp_c: data.current.temp_c,
        //   condition: data.current.condition.text,
        //   wind_kph: data.current.wind_kph,
        //   humidity: data.current.humidity,
        // };
        return data
      } catch (error) {
        console.error(`Failed to fetch weather for [${reg.lat}, ${reg.lng}]:`, error);
        return { error: `Failed to fetch weather for [${reg.lat}, ${reg.lng}]` };
      }
    })
  );
  
  return weatherData;
}

export async function getWeatherForEachLocation(location: any) {
  let data;
      const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location.latitude},${location.longtitude}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching data for location`);
        }
         data = await response.json();
        
      } catch (error) {
        console.error(`Failed to fetch weather for [${location.latitude}, ${location.longtitude}]:`, error);
        return { error: `Failed to fetch weather for [${location.latitude}, ${location.longtitude}]` };
      }
      return data
}

export default fetchCurrentWeather;
