export function timestampToString(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

export function dateToSeconds(value) {
  const date = new Date(value);
  const secs = "0" + date.getSeconds();
  return secs.slice(-2);
}
