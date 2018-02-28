export function timestampToString(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

export function dateToString(value) {
  const date = new Date(value);
  return date.toLocaleTimeString();
}
