export function sliceObject(object, start, end) {
  const entries = Object.entries(object);
  const sliced = entries.slice(start, end);
  const result = {};
  sliced.forEach(([key, value]) => (result[key] = value));
  return result;
}
