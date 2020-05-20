/* eslint-disable no-console */
import { ipReq } from './constants';

const axios = require('axios');

let ipInfo: {
  country: string,
  region: string,
  city: string,
  latitude: number,
  longitude: number,
  postal: number,
  timezone: string,
}

export default async function getIP() {
  // prevent several requests
  if (!ipInfo) {
    // ipInfo = {
    //   country: 'BY',
    //   region: 'Brest',
    //   city: 'Pinsk',
    //   latitude: 52.12,
    //   longitude: 26.1,
    //   postal: 225708,
    //   timezone: 'Europe/Minsk',
    // };

    const req = await axios.get(ipReq);
    let location = req.data.loc.match(/([^,]+)/g)
    ipInfo = {
      country: req.data.country,
      region: req.data.region,
      city: req.data.city,
      // широта
      latitude: location[0],
      // долгота
      longitude: location[1],
      postal: req.data.postal,
      timezone: req.data.timezone,
    };

    console.log('Getting IP Info:');
    console.log(ipInfo);
  }
  return ipInfo;
}
