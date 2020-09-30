import { useApi, isInputOutputResource, isOutputResource } from '../api';
import { useEffect, useState, useMemo } from 'react';
import { useLazyFetch } from './useLazyFetch';
import { Device } from '../types/Device';
import { uniqWith } from 'lodash';
import { getColorByIndex } from '../utils/colors';

export type useStreamingResourceProps = {
  resourceId: string;
  device: Device;
};

export type useStreamingResourceReturnProps = {
  keys: string[];
  sequences: {
    key: string;
    color: string;
    data: {
      value: number;
      timestamp: number;
    }[];
  }[];
  fetching: boolean;
};

const useStreamingResource = ({ resourceId, device }: useStreamingResourceProps): useStreamingResourceReturnProps => {
  const api = useApi();

  const [data, setData] = useState<{ name: string; value: number; timestamp: number }[]>([]);
  const [fetchResource, fetching, response] = useLazyFetch(api.resources.fetchOne);

  useEffect(() => {
    const interval = setInterval(
      () => fetchResource({ deviceId: device.dev, resource: resourceId, userId: device.usr }),
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [fetchResource, device, resourceId]);

  useEffect(() => {
    if (!!response && (isInputOutputResource(response) || isOutputResource(response))) {
      const { out } = response;
      if (typeof out === 'number') {
        setData((d) => [...d, { name: resourceId, timestamp: new Date().getTime(), value: out }]);
      } else {
        const entries = Object.entries(out)
          .filter(([, v]) => typeof v === 'number')
          .map(([k, v]) => ({ name: k, timestamp: new Date().getTime(), value: v as number }));
        setData((d) => [...d, ...entries]);
      }
    }
  }, [response, resourceId]);

  const keys = useMemo(() => {
    return uniqWith(data, (a, b) => a.name === b.name).map((v) => v.name);
  }, [data]);

  const sequences = useMemo(() => {
    return keys.map((key, index) => {
      return {
        key,
        color: getColorByIndex(index * 2),
        data: data
          .filter((v) => v.name === key)
          .slice(-20)
          .map((v) => ({ value: v.value, timestamp: v.timestamp })),
      };
    });
  }, [data, keys]);

  return { keys, sequences, fetching };
};

export default useStreamingResource;
