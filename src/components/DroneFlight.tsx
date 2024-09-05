export default function DroneFlight() {
  function sendCommand(command: string) {
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

  return (
    <>
      <h1>Drone commands</h1>
      <button onClick={() => sendCommand("appstart")}>Start app</button>
      <button onClick={() => sendCommand("default")}>Default</button>
      <button onClick={() => sendCommand("takeoff")}>Take off</button>
      <button onClick={() => sendCommand("stop")}>Stop</button>
      <button onClick={() => sendCommand("land")}>Land</button>
      <button onClick={() => sendCommand("up")}>Up</button>
      <button onClick={() => sendCommand("down")}>Down</button>
      <button onClick={() => sendCommand("rotateleft")}>Rotate left</button>
      <button onClick={() => sendCommand("rotateright")}>Rotate right</button>
      <button onClick={() => sendCommand("forward")}>Forward</button>
      <button onClick={() => sendCommand("back")}>Back</button>
      <button onClick={() => sendCommand("left")}>Left</button>
      <button onClick={() => sendCommand("right")}>Right</button>
    </>
  );
}
