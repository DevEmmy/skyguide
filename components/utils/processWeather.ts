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
      wind_dir: string;
      dewpoint_c: any;
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
      const { temp_c, condition, wind_kph, wind_dir,humidity, dewpoint_c } = weather.current;
    //   console.log({ temp_c, condition, wind_kph, humidity })

    const thermalIntensity = calculateThermalIntensity(temp_c, dewpoint_c, humidity, wind_kph);
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
        windDirection: compassToDegrees(wind_dir),
        windSpeed: wind_kph,
        thermalIntensity
      };
    });
  }
  
  // Function to calculate thermal intensity based on weather parameters
function calculateThermalIntensity(temp_c: number, dewpoint_c: number, humidity: number, wind_kph: number): number {
  const tempDewPointSpread = temp_c - dewpoint_c; // Larger spread means drier air
  const humidityFactor = 100 - humidity; // Lower humidity favors thermal activity
  const windFactor = wind_kph < 20 ? wind_kph : 20; // Favor moderate winds (limit wind factor to 20)

  // Calculate thermal intensity (simple formula for demonstration)
  const thermalIntensity = (tempDewPointSpread * 0.6) + (humidityFactor * 0.3) + (windFactor * 0.1);

  // Normalize the result between 0 and 10 for easier interpretation
  return Math.min(Math.max(thermalIntensity / 10, 0), 10);
}


  const compassToDegrees = (direction: string) => {
    switch (direction.toUpperCase()) {
      case 'N':
        return 0;
      case 'NE':
        return 45;
      case 'E':
        return 90;
      case 'SE':
        return 135;
      case 'S':
        return 180;
      case 'SW':
        return 225;
      case 'W':
        return 270;
      case 'NW':
        return 315;
      default:
        return 0; // Default to 0° for invalid input
    }
  };
  