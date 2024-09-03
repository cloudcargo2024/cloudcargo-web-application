export default function DroneFlight() {
  async function handleTakeOff() {
    await fetch("http://localhost:5000/takeoff", {
      method: "post",
    });
  }
  async function handleStop() {
    await fetch("http://localhost:5000/stop", {
      method: "post",
    });
  }
  return (
    <>
      <h1>Drone commands</h1>
      <button onClick={handleTakeOff}>Take off</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
