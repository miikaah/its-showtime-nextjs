export function prefixNumber(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

export function getFormattedDateString(date) {
  return `${prefixNumber(date.getHours())}:${prefixNumber(
    date.getMinutes()
  )} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
