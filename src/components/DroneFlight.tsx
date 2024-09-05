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
  function handleUp() {
    fetch("/api/drone-flight/up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleDown() {
    fetch("/api/drone-flight/down", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleRotateRight() {
    fetch("/api/drone-flight/rotateright", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleRotateLeft() {
    fetch("/api/drone-flight/rotateleft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleForward() {
    fetch("/api/drone-flight/forward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleBack() {
    fetch("/api/drone-flight/back", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleLeft() {
    fetch("/api/drone-flight/left", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleRight() {
    fetch("/api/drone-flight/right", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleDefault() {
    fetch("/api/drone-flight/default", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
  function handleAppStart() {
    fetch("/api/drone-flight/appstart", {
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
      <button onClick={handleAppStart}>Start app</button>
      <button onClick={handleDefault}>Default</button>
      <button onClick={handleTakeOff}>Take off</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLanding}>Land</button>
      <button onClick={handleUp}>Up</button>
      <button onClick={handleDown}>Down</button>
      <button onClick={handleRotateLeft}>Rotate left</button>
      <button onClick={handleRotateRight}>Rotate right</button>
      <button onClick={handleForward}>Forward</button>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleLeft}>Left</button>
      <button onClick={handleRight}>Right</button>
    </>
  );
}
