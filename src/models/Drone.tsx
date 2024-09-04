export type Drone = {
    coordinates: {
        lat: number;
        lng: number;
    };
    id: number;
    status: droneStatus;
};

type droneStatus = "parked" | "delivering" | "returning" | "undefined";

type droneCoordinates = {
    lat: number;
    lng: number;
};

  export{}