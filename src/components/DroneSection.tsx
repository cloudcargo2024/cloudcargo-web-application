import React from 'react';
import '../styles/droneList.css';
import {Drone} from '../models/Drone.tsx';

const drones: Drone[] = [
    {
        id: 0,
        status: "parked",
        coordinates: {
            lat: 1,
            lng: 1.5
        }
    },
    {
        id: 1,
        status: "delivering",
        coordinates: {
            lat: 1,
            lng: 1.5
        }
    },
    {
        id: 2,
        status: "returning",
        coordinates: {
            lat: 1,
            lng: 1.5
        }
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
            <div>Drone#{drone.id}</div>
            <div>{drone.status}</div>
            <div className="onHover">lng: {drone.coordinates.lat}; lng: {drone.coordinates.lng}</div>
        </li>
    ));

    return (
      <ul>
        {dronesList}
      </ul>
    );
  }

export default MainDrones;