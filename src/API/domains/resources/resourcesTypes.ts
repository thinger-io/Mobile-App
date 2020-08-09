export type Attribute = string | number | boolean;

export type InputResource = {
  in: Attribute | { [attribute: string]: Attribute };
};

export type OutputResource = {
  out: Attribute | { [attribute: string]: Attribute };
};

export type InputOutputResource = InputResource & OutputResource;

export type Resource = InputResource | OutputResource | InputOutputResource;

export function isInputResource(resource: Resource): resource is InputResource {
  return resource.hasOwnProperty('in') && !resource.hasOwnProperty('out');
}

export function isOutputResource(resource: Resource): resource is OutputResource {
  return !resource.hasOwnProperty('in') && resource.hasOwnProperty('out');
}

export function isInputOutputResource(resource: Resource): resource is InputOutputResource {
  return resource.hasOwnProperty('in') && resource.hasOwnProperty('out');
}
