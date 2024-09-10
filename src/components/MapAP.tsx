import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '../models/Drone'
import '../styles/Map.css'
import logo from '../assets/LogoCC.png';
import { Drone } from '../models/Drone';
import axios from 'axios';

function App() {
  const [DronesList, setDronesList] = useState<Drone[]>([]);
  const API_BASE_URL = "https://66d998da4ad2f6b8ed5550ff.mockapi.io";

  const fetchDrones = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Drone`);
      setDronesList(response.data);
    } catch (error) {
      console.error("Error fetching drones data:", error);
    }
  };

  const updateDroneById = useCallback(
    async (drone: Drone) => {
      try {
        console.log(`Updating drone with ID ${drone.id}:`, drone); 
        await axios.put(`${API_BASE_URL}/Drone/${drone.id}`, drone);
      } catch (error) {
        console.error("Error updating drones data:", error);
      }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchDrones();
  }, []);

  useEffect(() => {
    const updateCoordinates = () => {
      const newDronesList = DronesList.map((drone) => ({
        ...drone,
        coordinates: {
          lat: drone.coordinates.lat + 0.001, 
          lng: drone.coordinates.lng + 0.001,
        },
      }));
      
      setDronesList(newDronesList);
      newDronesList.forEach((drone) => updateDroneById(drone));
    };

    const interval = setInterval(updateCoordinates, 1000);
    return () => clearInterval(interval);
  }, [DronesList, updateDroneById]);

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
              <Marker key={drone.id} position={drone.coordinates} />
            ))}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}

export default App;