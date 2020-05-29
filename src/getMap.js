/* eslint-disable no-console */
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
  let latDeg = latitude.toString().match(/(^[^.]+)/)[0];
  let latMin = convertToMinutes(latitude);
  let longDeg = longitude.toString().match(/(^[^.]+)/)[0];
  let longMin = convertToMinutes(longitude);

  latitudeEl.textContent = `${latDeg}°${latMin}'`;
  longitudeEl.textContent = `${longDeg}°${longMin}'`;

  const mapboxgl = require('mapbox-gl');

  mapboxgl.accessToken = mapKey;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 10,
  });

  searchEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const { latitude: lat, longitude: long } = await getLocationInfo(searchInput.value);

    latDeg = lat.toString().match(/(^[^.]+)/)[0];
    latMin = convertToMinutes(lat);
    longDeg = long.toString().match(/(^[^.]+)/)[0];
    longMin = convertToMinutes(long);
    latitudeEl.textContent = `${latDeg}°${latMin}'`;

    longitudeEl.textContent = `${longDeg}°${longMin}'`;

    map.flyTo({
      center: [long, lat],
      zoom: 10,
      speed: 2,
      curve: 1,
      easing(t) {
        return t;
      },
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([long, lat])
      .addTo(map);
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

  console.log('Getting MAP');
}
