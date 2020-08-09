export type Device = {
  device: string;
  description: string;
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
