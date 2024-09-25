import { useEffect, useState } from "react";

export default function DroneFlight() {
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
      "rotateleft",
      "rotateright",
      "land",
    ];

    for (const command of commands) {
      await processEvent(command); // Send the command
      await delay(3000); // Wait for 3 seconds before sending the next command
    }
  }

  return (
    <>
      <h1>Drone commands</h1>
      <button onClick={() => sendMultipleCommands()}>Flight</button>
      <button onClick={() => processEvent("appstart")}>Start app</button>
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
      <button onClick={() => processEvent("right")}>Right</button>
    </>
  );
}
