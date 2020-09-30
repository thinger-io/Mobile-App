import React, { createContext, useReducer, useContext } from 'react';
import useStreamingResource, {
  useStreamingResourceProps,
  useStreamingResourceReturnProps,
} from '../hooks/useStremingResource';
import { Device } from '../types/Device';

type State = {
  device: Device;
  resourceId: string;
};

export type Action = { type: 'set' } & useStreamingResourceProps;

export const StreamingStateContext = createContext<useStreamingResourceReturnProps>({
  fetching: false,
  keys: [],
  sequences: [],
});
export const StreamingDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

const StreamingProvider = ({
  device,
  resourceId,
  children,
}: {
  device: Device;
  resourceId: string;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    (_state: State, action: Action) => {
      switch (action.type) {
        case 'set':
          return {
            ..._state,
            device: action.device,
            resourceId: action.resourceId,
          };
        default:
          throw new Error();
      }
    },
    { device, resourceId },
  );

  const value = useStreamingResource({ resourceId: state.resourceId, device: state.device });

  return (
    <StreamingStateContext.Provider value={value}>
      <StreamingDispatchContext.Provider value={dispatch}>{children}</StreamingDispatchContext.Provider>
    </StreamingStateContext.Provider>
  );
};

export const useStreamingState = () => useContext(StreamingStateContext);
export const useStreamingDispatch = () => useContext(StreamingDispatchContext);

export default StreamingProvider;
