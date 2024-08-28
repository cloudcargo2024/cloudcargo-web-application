type Drone = {
    id: number;
    status: droneStatus;
};

type droneStatus = "parked" | "delivering" | "returning" | "undefined";