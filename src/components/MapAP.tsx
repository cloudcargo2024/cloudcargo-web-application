import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '../models/Drone'
import '../styles/Map.css'
import logo from '../assets/LogoCC.png';
import { Drone } from '../models/Drone';

function App() {
  const [DronesList, setDronesList] = useState<Drone[]>([
  {
    id: 1,
    status: "delivering",
    coordinates: { lat: 45.92691060, lng: 24.22548070 },
  },
  {
    id: 2,
    status: "returning",
    coordinates: { lat: 46.76667000 , lng: 23.60000000 },
  },
  {
    id: 3,
    status: "parked",
    coordinates: { lat: 45.64861000 , lng: 25.60613000 },
  },
]);

  useEffect(() => {
    const updateCoordinates = () => {
      setDronesList((prevDronesList) =>
         prevDronesList.map((drone) => ({
        ...drone,
        coordinates: {
          lat: drone.coordinates.lat + 0.001, 
          lng: drone.coordinates.lng + 0.001,
        },
        }))
      );
    };

    const interval = setInterval(updateCoordinates, 500);
    return () => clearInterval(interval);
  }, []);

  const zoom = 7.3;
  return (
    <div className='map-container'>
      <div className='header'>
        <img className='logo' src={logo} alt='App Logo' />
        <p className='map-header'>Track Your Drones!</p>
      </div>
      <APIProvider apiKey={"AIzaSyDPFf4C-v_O2MHUX-0azevxBPBF38IBMXE"}>
        <div className='map'>
          <Map
            style={{ width: '445px', height: '445px'}}
            defaultCenter={{ lat: 45.892176, lng: 24.932724 }}
            defaultZoom={zoom}
            minZoom={zoom - 2}
            gestureHandling={'cooperative'}
            disableDefaultUI={true}
          >
            {DronesList.map((drone) => (
              <Marker key={drone.id} position={drone.coordinates} />
            ))}
          </Map>
      </div>
    </APIProvider>
    </div>
  );
}

export default App;