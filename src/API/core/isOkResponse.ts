/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorResponse } from './errorResponse';

export function isOkResponse<T>(ok: boolean, data: T | ErrorResponse | undefined): data is T {
  return ok;
}
