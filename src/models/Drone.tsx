import { markers } from '../assets/markers/allMarkers';

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

export const droneStatusIcons: Record<droneStatus, string> = {
    delivering: markers.red,
    returning: markers.green,
    parked: markers.orange,
    undefined: markers.black,
  };