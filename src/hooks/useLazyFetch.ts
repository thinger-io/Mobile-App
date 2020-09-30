import { useState, useCallback } from 'react';
import { ErrorResponse, ApiResponse, isOkResponse } from '../api';

export function useLazyFetch<T, P>(
  url: (headers: P) => Promise<ApiResponse<T, ErrorResponse>>,
): [(headers: P, callback?: (data: T) => void) => Promise<void>, boolean, T | undefined] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const method = useCallback(
    async (headers, callback) => {
      setLoading(true);
      async function fetchUrl() {
        const { ok, data: result } = await url(headers);
        if (ok && result && isOkResponse(ok, result)) {
          setData(result as T);
          if (callback) {
            await callback(result);
          }
        }
      }
      await fetchUrl();
      setLoading(false);
    },
    [url],
  );
  return [method, loading, data];
}
