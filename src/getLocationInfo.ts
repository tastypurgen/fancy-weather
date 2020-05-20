const axios = require('axios')

import getCurrentCity from './getIpInfo';

export default async function index() {
  const ipInfo = await getCurrentCity();
  const { latitude } = ipInfo;
  const { longitude } = ipInfo;

  const req = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=b4af77c6278c43fdb54452c961e6edc7&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1&language=en`)

  let locationInfo: {
    country: string,
    state: string,
    city: string,
  }
  console.log(req.data.results[0]);
  console.log('Getting Loc Info... (remaining for today: ' + req.data.rate.remaining + ')');
  locationInfo = {
    country: req.data.results[0].components.country,
    state: req.data.results[0].components.state,
    city: req.data.results[0].components.city
  }
  return locationInfo
};