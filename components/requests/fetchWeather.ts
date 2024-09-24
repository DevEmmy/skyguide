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

export default fetchCurrentWeather;