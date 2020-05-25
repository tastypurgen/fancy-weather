/* eslint-disable no-console */
import axios from 'axios';
import * as moment from 'moment';
import getIpInfo from './getIpInfo';
import { weatherKey } from './constants';


export default async function getWeather() {
  const obj = await getIpInfo();
  const { city } = obj;

  const nextDay = moment().add(1, 'day').format('YYYY-MM-DD');
  const afterNextDay = moment().add(2, 'day').format('YYYY-MM-DD');
  const afterAfterNextDay = moment().add(3, 'day').format('YYYY-MM-DD');

  const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=by&units=metric&APPID=${weatherKey}`);
  const forecast1 = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=${city}&dt=${nextDay}`);
  const forecast2 = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=${city}&dt=${afterNextDay}`);
  const forecast3 = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=363474e96d194f10ab9212718201105&q=${city}&dt=${afterAfterNextDay}`);
  const weather = {
    id: currentWeather.data.weather[0].id,
    temperature: `${parseInt(currentWeather.data.main.temp, 10).toString()}°`,
    summary: currentWeather.data.weather[0].main,
    feel: parseInt(currentWeather.data.main.feels_like, 10).toString(),
    wind: currentWeather.data.wind.speed,
    humidity: currentWeather.data.main.humidity,
    d0Temp: `${parseInt(forecast1.data.forecast.forecastday[0].day.maxtemp_c, 10).toString()}°`,
    d1Temp: `${parseInt(forecast2.data.forecast.forecastday[0].day.maxtemp_c, 10).toString()}°`,
    d2Temp: `${parseInt(forecast3.data.forecast.forecastday[0].day.maxtemp_c, 10).toString()}°`,

    d0Icon: `https:${forecast1.data.forecast.forecastday[0].day.condition.icon}`,
    d1Icon: `https:${forecast2.data.forecast.forecastday[0].day.condition.icon}`,
    d2Icon: `https:${forecast3.data.forecast.forecastday[0].day.condition.icon}`,
  };

  console.log('Getting weather API');
  console.log(weather);

  return weather;
}
