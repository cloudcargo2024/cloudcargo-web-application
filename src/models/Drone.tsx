export type Drone = {
    id: number;
    status: droneStatus;
    coordinates: droneCoordinates; 
};

type droneStatus = "parked" | "delivering" | "returning" | "undefined";

type droneCoordinates = {
    lat: number;
    lng: number;
  };

  export{}