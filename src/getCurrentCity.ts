/* eslint-disable no-console */
import { ipReq } from './constants';

const axios = require('axios');

export default async function getIP() {
  let ipInfo = {
    city: 'Pinsk',
    latitude: 52.1,
    longitude: 26.0,
  };

  const req = await axios.get(ipReq);
  ipInfo = {
    city: req.data.city,
    // широта
    latitude: req.data.loc.replace(/........$/, ''),
    // долгота
    longitude: req.data.loc.replace(/^......../, ''),
  };

  console.log('Getting IP Info:');
  console.log(ipInfo);
  return ipInfo;
}
