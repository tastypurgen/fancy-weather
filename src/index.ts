import { weatherKey } from './constants';

const mapboxgl = require('mapbox-gl');
const axios = require('axios');


// eslint-disable-next-line no-unused-vars
async function getWeather() {
  // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Pinsk&lang=by&units=metric&APPID=${weatherKey}`);
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Pinsk&lang=by&units=metric&APPID=${weatherKey}`);
  console.log(response.data);
}

mapboxgl.accessToken = 'pk.eyJ1IjoidGFzdHlwdXJnZW4iLCJhIjoiY2thY2s1MW5oMDQwbDJ6bzI0OHJjbnZtZCJ9.ZbLITBKqLN2fN0GF8yMrrQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [26.1, 52.12],
  zoom: 10,
});

// eslint-disable-next-line no-unused-vars
const marker = new mapboxgl.Marker()
  .setLngLat([26.1, 52.12])
  .addTo(map);


// getWeather();
// console.log(typeof searchBtn);
