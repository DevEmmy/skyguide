import { rateParaglidingSuitability } from "./ratingSuitability";

interface WeatherResponse {
    location: {
      lat: number;
      lon: number;
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: { text: string };
      wind_kph: number;
      humidity: number;
    };
  }
  
  interface RatedWeather {
    lat: number;
    lng: number;
    location: string;
    region: string;
    country: string;
    rating: number;
    suitability: string;
  }
  
  export function processWeatherData(weatherResponses: WeatherResponse[]): RatedWeather[] {
    return weatherResponses.map(weather => {
      const { temp_c, condition, wind_kph, humidity } = weather.current;
    //   console.log({ temp_c, condition, wind_kph, humidity })
      const { lat, lon, name, region, country } = weather.location;
  
      // Pass the weather conditions to the rating function
      const { suitability, rating } = rateParaglidingSuitability({
        temp_c,
        condition: condition.text,
        wind_kph,
        humidity,
      });
  
      // Return the required data structure
      return {
        lat,
        lng: lon,
        location: name,
        region,
        country,
        rating,
        suitability,
      };
    });
  }
  