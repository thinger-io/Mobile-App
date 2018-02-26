//@flow

type RESTART = { type: "STREAMING_RESTART" };

export type StreamingAction = RESTART;

export function restartStreaming(): RESTART {
  return {
    type: "STREAMING_RESTART"
  };
}
