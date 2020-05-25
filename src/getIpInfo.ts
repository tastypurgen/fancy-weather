/* eslint-disable no-console */
import axios from 'axios';
import { ipReq } from './constants';

const ipInfo: any = axios.get(ipReq).then(({ data }) => {
  const location = data.loc.match(/([^,]+)/g);

  return {
    country: data.country,
    region: data.region,
    city: data.city,
    latitude: location[0],
    longitude: location[1],
    postal: data.postal,
    timezone: data.timezone,
  };
}).catch(() => ({
  country: '',
  region: '',
  city: '',
  latitude: 0,
  longitude: 0,
  postal: 0,
  timezone: '',
}));

export default () => ipInfo;
