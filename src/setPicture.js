import axios from 'axios';
import { unsplashKey } from './constants';

const body = document.querySelector('body');
const date = new Date();
let season;
let time;

switch (date.getMonth()) {
  case 11:
  case 0:
  case 1:
    season = 'winter';
    break;
  case 2:
  case 3:
  case 4:
    season = 'spring';
    break;
  case 5:
  case 6:
  case 7:
    season = 'summer';
    break;
  default:
    season = 'fall';
    break;
}

switch (date.getHours()) {
  case 4:
  case 5:
  case 6:
  case 7:
  case 8:
  case 9:
  case 10:
    time = 'morning';
    break;
  case 11:
  case 12:
  case 13:
  case 14:
  case 15:
    time = 'day';
    break;
  case 16:
  case 17:
  case 18:
  case 19:
  case 20:
  case 21:
  case 22:
    time = 'evening';
    break;
  default:
    season = 'night';
    break;
}

export default async function setPicture() {
  try {
    const req = await axios.get(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${season},${time}&client_id=${unsplashKey}`);
    console.log(`Loading picture with tags: ${season}, ${time}`);
    const img = req.data.urls.regular;
    body.style.cssText = `background-image: linear-gradient(rgba(18, 18, 50, 0.5) 100%, rgba(18, 18, 50, 0.5) 100%), url("${img}")`;
  } catch (error) {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log(`Tried load background-image with tags "${season}", "${time}" but hourly limit is reached! :(`);
  }
}
