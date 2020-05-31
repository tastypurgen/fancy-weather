import axios from 'axios';
import { weatherKey, weatherBitKey } from './constants';
import getLocationInfo from './getLocationInfo';


export default async function getWeather(searchedCity) {
  const { latitude, longitude } = await getLocationInfo(searchedCity);

  const currentWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=${localStorage.lang}&units=${localStorage.unitsOW}&APPID=${weatherKey}`);
  const forecast = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=3&units=${localStorage.unitsWB}&key=${weatherBitKey}`);

  const weather = {
    id: currentWeather.data.weather[0].id,
    temperature: `${parseInt(currentWeather.data.main.temp, 10).toString()}°`,
    summary: currentWeather.data.weather[0].description,
    feel: parseInt(currentWeather.data.main.feels_like, 10).toString(),
    wind: currentWeather.data.wind.speed,
    humidity: currentWeather.data.main.humidity,
    timeZone: forecast.data.timezone,
    sunrise: currentWeather.data.sys.sunrise,
    sunset: currentWeather.data.sys.sunset,

    d0Temp: parseInt(forecast.data.data[0].max_temp, 10),
    d1Temp: parseInt(forecast.data.data[1].max_temp, 10),
    d2Temp: parseInt(forecast.data.data[2].max_temp, 10),

    d0Icon: `https://www.weatherbit.io/static/img/icons/${forecast.data.data[0].weather.icon}.png`,
    d1Icon: `https://www.weatherbit.io/static/img/icons/${forecast.data.data[1].weather.icon}.png`,
    d2Icon: `https://www.weatherbit.io/static/img/icons/${forecast.data.data[2].weather.icon}.png`,
  };

  return weather;
}
