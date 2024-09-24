import axios from "axios";

const key = process.env.NEXT_API_KEY;

const weatherApiConfig = axios.create({
    baseURL: `http://api.weatherapi.com/v1?key=${key}`
})

export default weatherApiConfig