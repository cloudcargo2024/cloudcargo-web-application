export type Drone = {
    id: number;
    status: droneStatus;
    coordinates: droneCoordinates; 
};

export type droneStatus = "parked" | "delivering" | "returning" | "undefined";

type droneCoordinates = {
    lat: number;
    lng: number;
  };