/* eslint-disable no-console */
import axios from 'axios';
import { ipReq } from './constants';


let ipInfo: {
  country: string,
  region: string,
  city: string,
  latitude: number,
  longitude: number,
  postal: number,
  timezone: string,
};

export default async function getIP() {
  if (typeof ipInfo === 'undefined') {
    const req = await axios.get(ipReq);
    const location = req.data.loc.match(/([^,]+)/g);
    ipInfo = {
      country: req.data.country,
      region: req.data.region,
      city: req.data.city,
      latitude: location[0],
      longitude: location[1],
      postal: req.data.postal,
      timezone: req.data.timezone,
    };

    console.log('Getting IP Info:');
    console.log(ipInfo);
  }
  return ipInfo;
}
