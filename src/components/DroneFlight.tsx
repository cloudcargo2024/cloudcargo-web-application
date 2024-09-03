export default function DroneFlight() {
  function handleTakeOff() {
    fetch("/api/drone-flight/takeoff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleStop() {
    fetch("/api/drone-flight/stop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleLanding() {
    fetch("/api/drone-flight/land", {
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
      <button onClick={handleTakeOff}>Take off</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLanding}>Land</button>
    </>
  );
}
