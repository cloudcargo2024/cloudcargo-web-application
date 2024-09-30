import React, { useState } from "react";
import "../styles/dronelistdesign.css";
import MainDrones from "../components/DroneSection";

const drones = [
  { id: 1, name: "Drone 1", speed: "72 km/h", range: "7 km", price: "$1500" },
  { id: 2, name: "Drone 2", speed: "55 km/h", range: "4 km", price: "$700" },
  { id: 3, name: "Drone 3", speed: "65 km/h", range: "6 km", price: "$1000" },
  { id: 4, name: "Drone 4", speed: "68 km/h", range: "10 km", price: "$800" },
  { id: 5, name: "Drone 5", speed: "58 km/h", range: "5 km", price: "$999" },
];

function DroneList() {
  const [selectedDrone, setSelectedDrone] = useState(null);

  const handleDroneClick = (drone) => {
    setSelectedDrone(drone);
  };

  const handleClose = () => {
    setSelectedDrone(null);
  };

  return (
    <div className="drone-container">
      <ul className="drone-list">
        {drones.map((drone) => (
          <li key={drone.id} onClick={() => handleDroneClick(drone)} className="drone-item">
            {drone.name}
          </li>
        ))}
      </ul>

      {selectedDrone && (
        <div className="drone-info-overlay">
          <div className="drone-info">
            <h2>{selectedDrone.name}</h2>
            <p>Speed: {selectedDrone.speed}</p>
            <p>Range: {selectedDrone.range}</p>
            <p>Price: {selectedDrone.price}</p>
            <button onClick={handleClose} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DroneList;