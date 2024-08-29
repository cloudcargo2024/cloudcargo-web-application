import React from 'react';
import './styles/droneList.css';
import './models.tsx';

const drones: Drone[] = [
    {
        id: 0,
        status: "parked"
    },
    {
        id: 1,
        status: "delivering"
    },
    {
        id: 2,
        status: "returning"
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

function Main() {
    const dronesList = drones.map((drone, index) => (
        <li key={index} className={getClassName(drone.status)}>
            {drone.id} - {drone.status}
        </li>
    ));

    return (
      <ul className='ol'>
        {dronesList}
      </ul>
    );
  }

export default Main;