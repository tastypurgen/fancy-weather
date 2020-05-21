/* eslint-disable no-console */
import axios from 'axios';
import getIpInfo from './getIpInfo';
import { weatherKey } from './constants';


export default async function getWeather() {
  const obj = await getIpInfo();
  const { city } = obj;

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=by&units=metric&APPID=${weatherKey}`);

  console.log('Getting weather API');
  console.log(response.data);

  const weather = {
    id: response.data.weather[0].id,
    temperature: `${parseInt(response.data.main.temp, 10).toString()}°`,
    icon: response.data.weather[0].icon,
    summary: response.data.weather[0].main,
    feel: parseInt(response.data.main.feels_like, 10).toString(),
    wind: response.data.wind.speed,
    humidity: response.data.main.humidity,
  };

  return weather;
}
