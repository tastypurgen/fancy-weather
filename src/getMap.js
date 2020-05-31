/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

import { mapKey } from './constants';
import { convertToMinutes } from './utils';
import getLocationInfo from './getLocationInfo';

const latitudeEl = document.querySelector('.latitude');
const longitudeEl = document.querySelector('.longitude');
const searchEl = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

export default async function getMap(searchedCity) {
  const { latitude, longitude } = await getLocationInfo(searchedCity);
  console.log('latitude, longitude: ', latitude, longitude);
  const latDeg = latitude.toString().match(/(^[^.]+)/)[0];
  const latMin = convertToMinutes(latitude);
  const longDeg = longitude.toString().match(/(^[^.]+)/)[0];
  const longMin = convertToMinutes(longitude);

  latitudeEl.textContent = `${latDeg}°${latMin}'`;
  longitudeEl.textContent = `${longDeg}°${longMin}'`;

  const mapboxgl = require('mapbox-gl');

  mapboxgl.accessToken = mapKey;
  window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 9,
  });

  searchEl.addEventListener('submit', async (e) => {
    e.preventDefault();
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(window.map);

  console.log('Getting MAP');
}
