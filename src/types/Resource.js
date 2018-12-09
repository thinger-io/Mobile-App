// @flow

import type { Attribute } from './Attribute';

export type Resource = {
  in?: Attribute | { [attribute: string]: Attribute },
  out?: Attribute | { [attribute: string]: Attribute },
};

export type SimpleResource = { [type: 'in' | 'out']: Attribute };

export type MultipleResource = {
  in?: { [attribute: string]: Attribute },
  out?: { [attribute: string]: Attribute },
};
