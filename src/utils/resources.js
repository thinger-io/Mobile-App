export function isMultipleResource(resource) {
  return (
    ('in' in resource && typeof resource.in === 'object')
    || ('out' in resource && typeof resource.out === 'object')
  );
}

export default {
  isMultipleResource,
};
