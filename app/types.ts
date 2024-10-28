export type Project = { title: string };

export type Feed = {
  device_id: string;
  lat: number;
  lon: number;
  time: string;
};

export type FeedEntry = {
  device_id: string;
  gps_lat: number;
  gps_lon: number;
  timestamp: string;
};
