/* eslint-disable no-console */
import getCurrentCity from './getCurrentCity';
import { weatherKey } from './constants';

const axios = require('axios');


export default async function getWeather() {
  const obj = await getCurrentCity();
  const { city } = obj;

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=by&units=metric&APPID=${weatherKey}`);

  console.log('Getting weather API');
  console.log(response);
  return response.data;
}
