import axios from "axios";

const key = process.env.NEXT_API_KEY;

const weatherApiConfig = () => axios.create({
    baseURL: `https://api.weatherapi.com/v1/`,
})

export default weatherApiConfig