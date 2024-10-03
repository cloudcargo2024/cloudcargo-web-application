import { useEffect, useState } from "react";

interface DroneFlightProps {
  onToggleStatus: () => void;
}

const DroneFlight: React.FC<DroneFlightProps> = ({ onToggleStatus }) => {
  async function sendCommand(command: string) {
    fetch(`/api/drone-flight/${command}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }

  let isProcessing = false;

  async function processEvent(command: string) {
    if (isProcessing) return;
    isProcessing = true;
    try {
      await sendCommand(command);
    } finally {
      isProcessing = false;
    }
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function sendMultipleCommands() {
    const commands = [
      "takeoff",
      "up",
      "default",
      "default",
      "default",
      "default",
      "default",
      "default",
      "rotateleft",
      "rotateleft",
      "rotateleft",
      "rotateright",
      "rotateright",
      "land",
      "land",
      "stop",
    ];

    for (const command of commands) {
      await processEvent(command); // Send the command
      await delay(400); // Wait for 3 seconds before sending the next command
    }
  }

  function handleButtonClick() {
    onToggleStatus();
    sendMultipleCommands();
  }

  const myStyle = {
    marginTop: "12px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <button style={myStyle} onClick={handleButtonClick}>
        Flight
      </button>
      {/* <button onClick={() => processEvent("appstart")}>Start app</button>
      <button onClick={() => processEvent("default")}>Default</button>
      <button onClick={() => processEvent("takeoff")}>Take off</button>
      <button onClick={() => processEvent("stop")}>Stop</button>
      <button onClick={() => processEvent("land")}>Land</button>
      <button onClick={() => processEvent("up")}>Up</button>
      <button onClick={() => processEvent("down")}>Down</button>
      <button onClick={() => processEvent("rotateleft")}>Rotate left</button>
      <button onClick={() => processEvent("rotateright")}>Rotate right</button>
      <button onClick={() => processEvent("forward")}>Forward</button>
      <button onClick={() => processEvent("back")}>Back</button>
      <button onClick={() => processEvent("left")}>Left</button>
      <button onClick={() => processEvent("right")}>Right</button> */}
    </>
  );
};

export default DroneFlight;
