//@flow

export type Attribute =
  | string
  | number
  | boolean
  | {
      [attribute: string]: string | number | boolean
    };

