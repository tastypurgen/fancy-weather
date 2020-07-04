import axios from 'axios';
import getCurrentCity from './getIpInfo';

export default async function getLocationInfo(city) {
  const ipInfo = await getCurrentCity();
  const { latitude } = ipInfo;
  const { longitude } = ipInfo;
  const lang = (localStorage.getItem('lang')) ? localStorage.getItem('lang') : 'en';

  let req;
  try {
    if (!city) {
      req = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=d2dd98e8d2f346c692d749feaf128c8b&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1&language=${lang}`);
    } else {
      req = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=d2dd98e8d2f346c692d749feaf128c8b&q=${city}&pretty=1&no_annotations=1&language=${lang}`);
    }
    const locationInfo = {
      suburb: req.data.results[0].components.suburb,
      city: req.data.results[0].components.city,
      county: req.data.results[0].components.county,
      state: req.data.results[0].components.state,
      country: req.data.results[0].components.country,
      formatted: req.data.results[0].formatted,
      latitude: req.data.results[0].geometry.lat,
      longitude: req.data.results[0].geometry.lng,
    };

    localStorage.setItem('city', locationInfo.city);
    return locationInfo;
  } catch (error) {
    return null;
  }
}
