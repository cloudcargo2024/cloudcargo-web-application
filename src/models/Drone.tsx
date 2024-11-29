export type Drone = {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  id: number;
  status: droneStatus;
};

export type droneStatus =
  | "available"
  | "delivering"
  | "returning"
  | "undefined";

export {};
