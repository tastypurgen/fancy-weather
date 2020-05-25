/* eslint-disable no-console */
import getCurrentCity from './getIpInfo';
import { mapKey } from './constants';
import convertToMinutes from './utils';

const latitudeEl = document.querySelector('.latitude span');
const longitudeEl = document.querySelector('.longitude span');

export default async function getCurrentMap() {
  const ipInfo = await getCurrentCity();
  const { latitude, longitude } = ipInfo;
  const latDeg = latitude.toString().match(/(^[^.]+)/)[0];
  const latMin = convertToMinutes(latitude);
  const longDeg = longitude.toString().match(/(^[^.]+)/)[0];
  const longMin = convertToMinutes(longitude);

  latitudeEl.textContent = `${latDeg}° ${latMin}'`;
  longitudeEl.textContent = `${longDeg}° ${longMin}'`;

  // eslint-disable-next-line global-require
  const mapboxgl = require('mapbox-gl');

  mapboxgl.accessToken = mapKey;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 10,
  });

  // eslint-disable-next-line no-unused-vars
  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);

  console.log('Getting MAP');
}
