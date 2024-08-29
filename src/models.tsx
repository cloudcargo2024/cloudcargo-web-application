type Drone = {
    id: number;
    status: DroneStatus;
    size: Size;
    x: number;
    y: number;
    z: number;
};

type DroneStatus = "parked" | "delivering" | "returning" | "undefined";
type Size = "small" | "medium" | "big";