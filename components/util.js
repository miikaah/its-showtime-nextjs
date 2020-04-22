export function prefixNumber(value) {
  return value < 10 ? `0${value}` : `${value}`;
}
