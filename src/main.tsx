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

function Main() {
    let list = [];
    for(let i = 0; i < drones.length; i++) {
        if(drones[i].status === "parked") {
            list[i] = <li className="green">
                {drones[i].id} - {drones[i].status};
            </li>
        }
        else if(drones[i].status === "delivering") {
            list[i] = <li className="red">
                {drones[i].id} - {drones[i].status};
            </li>
        }
        else if(drones[i].status === "returning") {
            list[i] = <li className="orange">
                {drones[i].id} - {drones[i].status};
            </li>
        }
        else {
            list[i] = <li className="dark">
                {drones[i].id} - {drones[i].status};
            </li>
        }
    }

    return (
      <ol className='ol'>
        {list}
      </ol>
    );
  }

export default Main;