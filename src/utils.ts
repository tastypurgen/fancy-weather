export default function convertToMinutes(num: number) {
  return parseInt((Number(num.toString().match(/([^.]+$)/)[0].slice(0, 2)) / 1.67).toString(), 10);
}
