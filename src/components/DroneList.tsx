import React, { useState, useEffect } from "react";
import "../styles/DroneList2.css";
import axios from "axios";

export default function DroneListComponent() {
  const API_BASE_URL = "https://66d998da4ad2f6b8ed5550ff.mockapi.io";

  const [DronesList, setDronesList] = useState<Drone[]>([]);
  const [nonUpdateError, setNonUpdateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(5);

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Drone`);
        setDronesList(response.data);
      } catch (err) {
        setUpdateError(null);
        setNonUpdateError(
          "Failed to fetch drone data. Please try again later."
        );
      }
    };

    fetchDrones();
  }, []);

  // Definim tipul Drone
  type Drone = {
    id: number;
    name: string;
    status: "available" | "in-use";
  };

  const initialDrones: Drone[] = DronesList;
  //[
  // { id: 1, name: "Drone 1", status: "available" },
  // { id: 2, name: "Drone 2", status: "in-use" },
  // { id: 3, name: "Drone 3", status: "in-use" },
  // { id: 4, name: "Drone 4", status: "available" },
  // { id: 5, name: "Drone 5", status: "available" },
  // { id: 6, name: "Drone 6", status: "in-use" },
  //];

  const DroneList: React.FC = () => {
    const [drones, setDrones] = useState<Drone[]>(initialDrones);
    const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [newDroneName, setNewDroneName] = useState<string>("");
    const [newDroneStatus, setNewDroneStatus] = useState<
      "available" | "in-use"
    >("available");

    // Funcție de gestionare a click-ului pe dronă
    const handleDroneClick = (drone: Drone) => {
      setSelectedDrone(drone);
    };

    // Funcție de căutare
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    };

    // Funcția pentru a vizualiza statusul dronei
    const handleViewStatus = () => {
      if (selectedDrone) {
        alert(`Status: ${selectedDrone.status}`);
      }
    };

    // Funcția pentru a edita drona (modificare nume)
    const handleEditDrone = () => {
      if (selectedDrone) {
        const newName = prompt(
          "Enter new name for the drone:",
          selectedDrone.name
        );
        if (newName && newName.trim() !== "") {
          setDrones(
            drones.map((drone) =>
              drone.id === selectedDrone.id
                ? { ...drone, name: newName }
                : drone
            )
          );
        }
      }
    };

    // Funcția pentru a schimba statusul dronei între available și in-use
    const handleToggleStatus = () => {
      if (selectedDrone) {
        const updatedStatus =
          selectedDrone.status === "available" ? "in-use" : "available";
        setDrones(
          drones.map((drone) =>
            drone.id === selectedDrone.id
              ? { ...drone, status: updatedStatus }
              : drone
          )
        );
      }
    };

    // Funcția pentru a adăuga o nouă dronă
    const handleAddDrone = () => {
      if (newDroneName.trim() !== "") {
        const newDrone: Drone = {
          id: drones.length + 1, // Generăm un nou ID bazat pe lungimea listei
          name: newDroneName,
          status: newDroneStatus,
        };
        setDrones([...drones, newDrone]);
        setNewDroneName(""); // Resetăm câmpul de text după adăugare
        setNewDroneStatus("available"); // Resetăm statusul la "available"
      } else {
        alert("Please enter a valid drone name.");
      }
    };

    // Funcția pentru a elimina drona din listă
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
                <span className="drone-status">
                  {drone.status === "available" ? "Available" : "In use"}
                </span>
              </li>
            ))
          ) : (
            <li className="no-drones">No drones found</li>
          )}
        </ul>

        {/* Meniul de opțiuni care apare când o dronă este selectată */}
        {selectedDrone && (
          <div className="drone-menu">
            <h3>{selectedDrone.name} Options</h3>
            <ul>
              <li onClick={handleViewStatus}>View Status</li>
              <li onClick={handleEditDrone}>Edit Drone</li>
              <li onClick={handleToggleStatus}>
                {selectedDrone.status === "available"
                  ? "Mark as In Use"
                  : "Mark as Available"}
              </li>
              <li onClick={handleRemoveDrone}>Remove Drone</li>
            </ul>
            <button className="close-menu" onClick={handleCloseMenu}>
              Close Menu
            </button>
          </div>
        )}

        {/* Formular pentru adăugarea unei noi drone */}
        <div className="add-drone-form">
          <h3>Add New Drone</h3>
          <input
            type="text"
            placeholder="Drone name"
            value={newDroneName}
            onChange={(e) => setNewDroneName(e.target.value)}
          />
          <select
            value={newDroneStatus}
            onChange={(e) =>
              setNewDroneStatus(e.target.value as "available" | "in-use")
            }
          >
            <option value="available">Available</option>
            <option value="in-use">In Use</option>
          </select>
          <button onClick={handleAddDrone}>Add Drone</button>
        </div>
      </div>
    );
  };
}
