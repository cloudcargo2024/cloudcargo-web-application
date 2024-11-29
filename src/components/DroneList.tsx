import React, { useState, useEffect } from "react";
import "../styles/DroneList2.css";
import axios from "axios";
import { Drone } from "../models/Drone";
import DroneFlight from "./DroneFlight";

const DroneList: React.FC = () => {
  const API_BASE_URL = "https://66fbf91c8583ac93b40e0f30.mockapi.io/";

  const defaultLat = 46.7712;
  const defaultLng = 23.6236;

  const [drones, setDrones] = useState<Drone[]>([]);
  const [nonUpdateError, setNonUpdateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(5);
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [newDroneName, setNewDroneName] = useState<string>("");
  const [newDroneStatus, setNewDroneStatus] = useState<
    "available" | "delivering"
  >("available");

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Drone`);
        console.log(response.data);
        setDrones(response.data);
      } catch (err) {
        setUpdateError(null);
        setNonUpdateError(
          "Failed to fetch drone data. Please try again later."
        );
      }
    };

    fetchDrones();
  }, []);

  const handleDroneClick = (drone: Drone) => {
    setSelectedDrone(drone);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleViewStatus = () => {
    if (selectedDrone) {
      alert(`Status: ${selectedDrone.status}`);
    }
  };

  const handleEditDrone = () => {
    if (selectedDrone) {
      const newName = prompt(
        "Enter new name for the drone:",
        selectedDrone.name
      );
      if (newName && newName.trim() !== "") {
        setDrones(
          drones.map((drone) =>
            drone.id === selectedDrone.id ? { ...drone, name: newName } : drone
          )
        );
      }
    }
  };

  const handleToggleStatus = () => {
    if (selectedDrone) {
      const updatedStatus =
        selectedDrone.status === "available" ? "delivering" : "available";
      setDrones(
        drones.map((drone) =>
          drone.id === selectedDrone.id
            ? { ...drone, status: updatedStatus }
            : drone
        )
      );
    }
  };

  const handleToggleStatusApi = () => {
    if (selectedDrone) {
      const updatedStatus =
        selectedDrone.status === "available" ? "delivering" : "available";
      drones.map((drone) =>
        drone.id === selectedDrone.id
          ? axios
              .put(`${API_BASE_URL}/Drone/${selectedDrone.id}`, {
                ...drone,
                status: updatedStatus,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
          : drone
      );
    }
    handleToggleStatus();
  };

  const handleAddDrone = () => {
    if (newDroneName.trim() !== "") {
      const newDrone: Drone = {
        id: drones.length + 1, // Generăm un nou ID bazat pe lungimea listei
        name: newDroneName,
        status: newDroneStatus,
        coordinates: {
          lat: defaultLat,
          lng: defaultLng,
        },
      };
      setDrones([...drones, newDrone]);
      setNewDroneName(""); // Resetăm câmpul de text după adăugare
      setNewDroneStatus("available"); // Resetăm statusul la "available"
    } else {
      alert("Please enter a valid drone name.");
    }
  };

  const handleRemoveDrone = () => {
    if (selectedDrone) {
      setDrones(drones.filter((drone) => drone.id !== selectedDrone.id));
    }
    setSelectedDrone(null);
  };

  const handleCloseMenu = () => {
    setSelectedDrone(null);
  };

  const filteredDrones = drones.filter((drone) =>
    drone.name.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(drones);

  return (
    <div className="drone-list-container">
      {/* Căutare dronă */}
      <input
        type="text"
        placeholder="Search drone"
        className="drone-search"
        value={searchText}
        onChange={handleSearchChange}
      />

      {/* Listă drone */}
      <ul className="drone-list">
        {filteredDrones.length > 0 ? (
          filteredDrones.map((drone) => (
            <li
              key={drone.id}
              className={`drone-item ${drone.status}`}
              onClick={() => handleDroneClick(drone)}
            >
              <span className="drone-name">{drone.name}</span>
              <span className="drone-status">{drone.status}</span>
            </li>
          ))
        ) : (
          <li className="no-drones">No drones found</li>
        )}
      </ul>

      {/* Meniul de opțiuni care apare când o dronă este selectată */}
      {selectedDrone && selectedDrone.status === "available" && (
        <div className="drone-menu">
          <h3>{selectedDrone.name} options</h3>
          <ul>
            <label>Choose packet</label>
            <form>
              <label className="option">
                <input
                  className="input"
                  type="radio"
                  name="options"
                  value="1"
                />
                Adrenaline
              </label>

              <label className="option">
                <input
                  className="input"
                  type="radio"
                  name="options"
                  value="2"
                />
                Missing person
              </label>

              <label className="option">
                <input
                  className="input"
                  type="radio"
                  name="options"
                  value="3"
                />
                Other
              </label>
            </form>
            <label>Latitude</label>
            <input></input>
            <label>Longitude</label>
            <input></input>
          </ul>
          <DroneFlight onToggleStatus={handleToggleStatusApi} />
          <button className="close-menu" onClick={handleCloseMenu}>
            Close menu
          </button>
        </div>
      )}
    </div>
  );
};

// Export the DroneList component
export default DroneList;
