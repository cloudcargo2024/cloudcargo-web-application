import { markers } from "../assets/markers/allMarkers";
import { droneStatus } from "../models/Drone";

export const droneStatusIcons: Record<droneStatus, string> = {
    delivering: markers.red,
    returning: markers.green,
    parked: markers.orange,
    undefined: markers.black,
  };

  export default droneStatusIcons;