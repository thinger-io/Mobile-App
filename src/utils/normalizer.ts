// NORMALIZATION
function normalizeIds<T extends { id: string }>(array: T[]) {
  return array.map((o) => o.id);
}

function normalizeById<T extends { id: string }>(array: T[]): { [id: string]: T } {
  return array.reduce((result, o) => ({ ...result, [o.id]: o }), {});
}

export function normalize<T extends { id: string }>(array: T[]) {
  return {
    ids: normalizeIds(array),
    byId: normalizeById(array),
  };
}

// DENORMALIZATION
export function denormalize<T extends { id: string }>(ids: string[], byId: { [id: string]: T }) {
  return ids.map((id) => byId[id]);
}
