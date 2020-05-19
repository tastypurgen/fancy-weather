import getCurrentCity from './getCurrentCity';
import { mapKey } from './constants';

export default async function getCurrentMap() {
  const ipInfo = await getCurrentCity();

  const { latitude } = ipInfo;
  const { longitude } = ipInfo;

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
}
