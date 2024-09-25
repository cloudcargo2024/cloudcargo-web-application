import { useEffect, useState } from "react";

export default function DroneFlight() {
  // const [currentKey, setCurrentKey] = useState<string>("");

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     console.log(event.code);
  //     setCurrentKey(event.code);
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   // Cleanup function to remove the event listener
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

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
  // switch (currentKey) {
  //   case "ArrowUp":
  //     processEvent("forward");
  //     break;
  //   case "ArrowDown":
  //     processEvent("back");
  //     break;
  //   case "ArrowLeft":
  //     processEvent("left");
  //     break;
  //   case "ArrowRight":
  //     processEvent("right");
  //     break;
  //   case "Space":
  //     processEvent("stop");
  //     break;
  //   case "KeyW":
  //     processEvent("up");
  //     break;
  //   case "KeyS":
  //     processEvent("down");
  //     break;
  //   case "KeyA":
  //     processEvent("rotateleft");
  //     break;
  //   case "KeyD":
  //     processEvent("rotateright");
  //     break;
  //   default:
  //     processEvent("default");
  //     break;
  // }

  return (
    <>
      <h1>Drone commands</h1>
      {/* <button onClick={() => processEvent("flight")}>Flight</button> */}
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
