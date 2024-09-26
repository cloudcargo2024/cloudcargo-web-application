export type Drone = {
  coordinates: {
    lat: number;
    lng: number;
  };
  id: number;
  status: droneStatus;
};

export type droneStatus = "parked" | "delivering" | "returning" | "undefined";

type droneCoordinates = {
  lat: number;
  lng: number;
};

export {};
