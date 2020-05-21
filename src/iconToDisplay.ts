export default function iconToDisplay(code: number) {
  let picName = 'clear';
  if (code < 300) picName = 'thunder';
  else if (code >= 300 && code < 501) picName = 'rainy1';
  else if (code >= 501 && code < 600) picName = 'rainy2';
  else if (code >= 600 && code < 700) picName = 'snowy';
  else if (code >= 700 && code < 800) picName = 'clouds2';
  else if (code === 800) picName = 'clear';
  else if (code === 802 || code === 804) picName = 'clouds2';
  else picName = 'clouds1';

  return `background-image: url("/img/weather/${picName}.svg")`;
}
