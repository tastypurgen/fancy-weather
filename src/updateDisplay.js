import * as moment from 'moment-timezone';
import getWeather from './getWeather';
import getLocationInfo from './getLocationInfo';
import iconToDisplay from './iconToDisplay';
import { belWeather, weatherDescription } from './transcript';
import { toggleSpinner, convertToMinutes, getPlace } from './utils';
import setPicture from './setPicture';

const cityEl = document.querySelector('.display__city span');
const dateEl = document.querySelector('.display__time span');
const timeEl = document.querySelector('.display__time span + span');
const temperatureEl = document.querySelector('.display__temperature');
const iconEl = document.querySelector('.right');
const summaryEl = document.querySelector('.summary');
const feelEl = document.querySelector('.feels-like span');
const windEl = document.querySelector('.wind span');
const humidityEl = document.querySelector('.humidity span');
const feelVal = document.querySelector('.feels-like span + span');
const windVal = document.querySelector('.wind span + span');
const windVal2 = document.querySelector('.wind span + span + span');
const humidityVal = document.querySelector('.humidity span + span');
const forecastWeekDays = document.querySelectorAll('.day');
const forecastElements = document.querySelectorAll('.temperature');
const forecastIcons = document.querySelectorAll('.icon img');

const latitudeEl = document.querySelector('.latitude');
const longitudeEl = document.querySelector('.longitude');
const searchInput = document.querySelector('.search-input');
const alertMsg = document.querySelector('.alert-msg');
const sunriseEl = document.querySelector('.sunrise span');
const sunsetEl = document.querySelector('.sunset span');


async function updateDisplay(searchedCity) {
  toggleSpinner();
  try {
    const {
      suburb, city, county, state, country,
    } = await getLocationInfo(searchedCity);
    const {
      id, temperature, summary, feel, wind, humidity, timeZone, sunrise, sunset, d0Temp, d1Temp, d2Temp, d0Icon, d1Icon, d2Icon,
    } = await getWeather(searchedCity);

    setPicture();


    moment.locale(localStorage.lang);
    cityEl.textContent = getPlace(suburb, city, county, state, country);
    dateEl.textContent = moment().format('dd, MMMM DD');

    window.clearInterval(window.currentTime);
    window.currentTime = window.setInterval(() => { timeEl.textContent = new Date().toLocaleTimeString('ru', { timeZone }); }, 1000);

    temperatureEl.textContent = temperature;
    iconEl.style.cssText = iconToDisplay(id);
    summaryEl.textContent = localStorage.lang === 'be' ? belWeather[id] : summary;
    feelEl.textContent = weatherDescription[localStorage.lang][0];
    windEl.textContent = weatherDescription[localStorage.lang][1];
    windVal2.textContent = weatherDescription[localStorage.lang][2];
    humidityEl.textContent = weatherDescription[localStorage.lang][3];
    feelVal.textContent = feel;
    windVal.textContent = wind;
    humidityVal.textContent = humidity;

    forecastWeekDays[0].textContent = moment().add(1, 'day').format('dddd');
    forecastWeekDays[1].textContent = moment().add(2, 'day').format('dddd');
    forecastWeekDays[2].textContent = moment().add(3, 'day').format('dddd');
    forecastElements[0].textContent = `${d0Temp}°`;
    forecastElements[1].textContent = `${d1Temp}°`;
    forecastElements[2].textContent = `${d2Temp}°`;
    forecastIcons[0].setAttribute('src', d0Icon);
    forecastIcons[1].setAttribute('src', d1Icon);
    forecastIcons[2].setAttribute('src', d2Icon);

    sunriseEl.textContent = moment.unix(sunrise).tz(timeZone).format('HH:mm');
    sunsetEl.textContent = moment.unix(sunset).tz(timeZone).format('HH:mm');

    const { latitude: lat, longitude: long } = await getLocationInfo(searchInput.value);

    const latDeg = lat.toString().match(/(^[^.]+)/)[0];
    const latMin = convertToMinutes(lat);
    const longDeg = long.toString().match(/(^[^.]+)/)[0];
    const longMin = convertToMinutes(long);
    latitudeEl.textContent = `${latDeg}°${latMin}'`;

    longitudeEl.textContent = `${longDeg}°${longMin}'`;

    window.map.flyTo({
      center: [long, lat],
      zoom: 9,
      speed: 3,
      curve: 1,
      easing(t) {
        return t;
      },
    });
  } catch (error) {
    // console.log(error);
    alertMsg.classList.remove('hidden-slow');
    alertMsg.textContent = `No results for ${searchInput.value} :(`;
    setTimeout(() => alertMsg.classList.add('hidden-slow'), 2000);
  } finally {
    toggleSpinner();
  }

  // forecastElements.forEach((el, i) => {
  //   const number = 0;
  //   el.textContent = days[`day${i}`];

  //   // console.log(days[`day${i}`]: );
  //   // console.log(days[i]);
  //   // console.log(days[`day${i}`]);
  //   // el.textContent = days[`day${i}`];
  // });
}

export default updateDisplay;
