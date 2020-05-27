/* eslint-disable no-console */
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

  // eslint-disable-next-line global-require
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
    // setDislpayInfo(searchInput.value);
    const { latitude: lat, longitude: long } = await getLocationInfo(searchInput.value);
    console.log(long, lat);
    map.flyTo({
      center: [long, lat],
      zoom: 10,
      speed: 2,
      curve: 1,
      easing(t) {
        return t;
      },
    });
  });

  // eslint-disable-next-line no-unused-vars
  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

  console.log('Getting MAP');
}
