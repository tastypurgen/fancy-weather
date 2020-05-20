/* eslint-disable no-console */
import getCurrentCity from './getIpInfo';
import { weatherKey } from './constants';

const axios = require('axios');


export default async function getWeather() {
  const obj = await getCurrentCity();
  const { city } = obj;

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=by&units=metric&APPID=${weatherKey}`);

  console.log('Getting weather API');
  console.log(response.data);

  let weather: {
    temperature: string,
    icon: string,
    summary: string,
    feel: string,
    wind: string,
    humidity: string
  }

  weather = {
    temperature: parseInt(response.data.main.temp, 10).toString() + '°',
    icon: response.data.weather[0].icon,
    summary: response.data.weather[0].main,
    feel: parseInt(response.data.main.feels_like, 10).toString(),
    wind: response.data.wind.speed,
    humidity: response.data.main.humidity
  }

  return weather;
}
