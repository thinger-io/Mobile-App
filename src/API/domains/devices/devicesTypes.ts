export type Device = {
  svr?: string;
  device: string;
  description: string;
  user: string;
  type: string;
  connection: {
    active: boolean;
    ts: number;
  };
};

export type DeviceStats = {
  connected: boolean;
  connected_ts: number;
  ip_address: string;
  rx_bytes: number;
  tx_bytes: number;
};
