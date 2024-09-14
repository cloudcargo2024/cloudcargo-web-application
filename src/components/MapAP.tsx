import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '../models/Drone'
import '../styles/Map.css'
import logo from '../assets/LogoCC.png';
import { Drone, droneStatusIcons } from '../models/Drone';
import axios from 'axios';

function App() {
  const [DronesList, setDronesList] = useState<Drone[]>([]);
  const [nonUpdateError, setNonUpdateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(5);
  const API_BASE_URL = "https://66d998da4ad2f6b8ed5550ff.mockapi.io";

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Drone`);
        setDronesList(response.data);
      } catch (err) {
        setUpdateError(null);
        setNonUpdateError("Failed to fetch drone data. Please try again later.");
      }
    };

    fetchDrones();
  }, []);

  useEffect(() => {
    const updateCoordinates = async () => {
      if (retryCount === 0) return;
      
      for (const drone of DronesList) {
        if (drone.status === "parked") {
          continue;
        }

        const newCoordinates = {
          lat: drone.coordinates.lat + 0.001,
          lng: drone.coordinates.lng + 0.001,
        };

        try {
          await axios.put(`${API_BASE_URL}/Drone/${drone.id}`, {
            ...drone,
            coordinates: newCoordinates,
          });

        } catch (error) {
          setUpdateError("Failed to update drones data. Retrying...");
          setRetryCount((prevCount) => prevCount - 1);
          continue;
        }

        setDronesList((prevDronesList) =>
          prevDronesList.map((d) =>
            d.id === drone.id ? { ...d, coordinates: newCoordinates } : d
          )
        );
      }
    };

    const interval = setInterval(updateCoordinates, 500);

    if (retryCount === 0) {
      clearInterval(interval);
      setUpdateError(null);
      setNonUpdateError("Failed to update drones data. Please try again later.")
    }

    return () => clearInterval(interval);
  }, [DronesList, retryCount]);

  useEffect(() => {
    if (updateError) {
      const timeoutId = setTimeout(() => setUpdateError(null), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [updateError]);

  const zoom = 7.3;
  return (
    <div className='map-container'>
      <div className='header'>
        <img className='logo' src={logo} alt='App Logo' />
        <p className='map-header'>Track Your Drones!</p>
      </div>
      <APIProvider apiKey={"AIzaSyBBOiWI5PDBmA0QzekL6b8uf3fafaBVLQA"}>
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
              <Marker key={drone.id}
                position={drone.coordinates}
                icon={droneStatusIcons[drone.status]} />
            ))}
          </Map>
        </div>
      </APIProvider>
      {nonUpdateError && <div className="error-message">{nonUpdateError}</div>}
      {updateError && <div className="error-message">{updateError}</div>}
    </div>
  );
}

export default App;