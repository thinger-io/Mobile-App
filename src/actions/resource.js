//@flow

import type { Resource } from "../types/Resource";

type SELECT = { type: "RESOURCE_SELECT", resource: string };
type REQUEST = { type: "RESOURCE_REQUEST", resource: string };
type RECEIVE = {
  type: "RESOURCE_RECEIVE",
  resource: string,
  value: Resource
};
type REMOVE_ALL = { type: "RESOURCE_REMOVE_ALL" };
type RESTART_STREAMING = { type: "RESOURCE_RESTART_STREAMING" };

export type ResourceAction =
  | SELECT
  | REQUEST
  | RECEIVE
  | REMOVE_ALL
  | RESTART_STREAMING;

export function selectResource(resource: string): SELECT {
  return {
    type: "RESOURCE_SELECT",
    resource
  };
}

export function requestResource(resource: string): REQUEST {
  return {
    type: "RESOURCE_REQUEST",
    resource
  };
}

export function receiveResource(resource: string, value: Resource): RECEIVE {
  return {
    type: "RESOURCE_RECEIVE",
    resource,
    value
  };
}

export function removeAllResources(): REMOVE_ALL {
  return {
    type: "RESOURCE_REMOVE_ALL"
  };
}

export function restartStreaming(): RESTART_STREAMING {
  return {
    type: "RESOURCE_RESTART_STREAMING"
  };
}
