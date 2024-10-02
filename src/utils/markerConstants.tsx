import { markers } from "../assets/markers/allMarkers";
import { droneStatus } from "../models/Drone";

export const droneStatusIcons: Record<droneStatus, string> = {
  delivering: markers.red,
  returning: markers.orange,
  available: markers.green,
  undefined: markers.black,
};

export default droneStatusIcons;
