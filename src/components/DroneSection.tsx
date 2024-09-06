import React from 'react';
import '../styles/droneList.css';
import '../models.tsx';

const drones: Drone[] = [
    {
        id: 0,
        status: "parked",
        size: "small",
        x: 0.5, y: 0, z: 0
    },
    {
        id: 1,
        status: "delivering",
        size: "small",
        x: 0, y: 0, z: 0
    },
    {
        id: 2,
        status: "returning",
        size: "small",
        x: 0, y: 0, z: 0
    }
];

function getClassName(status: string) {
    switch(status) {
        case "parked":
            return "green";
        case "delivering":
            return "red";
        case "returning":
            return "orange";
    }
}

function MainDrones() {
    const dronesList = drones.map((drone, index) => (
        <li key={index} className={getClassName(drone.status)}>
            <div>Drone#{drone.id}-{drone.size}</div>
            <div>{drone.status}</div>
            <div className="onHover">x: {drone.x}; y: {drone.y}; z: {drone.z}</div>
        </li>
    ));

    return (
      <ul>
        {dronesList}
      </ul>
    );
  }

export default MainDrones;