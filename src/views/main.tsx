import { useContext } from "react";
import MapAP from "../components/MapAP";
import isLoggedInContext from "../context/context";
import "../context/context.css";
import DroneList from "../droneLIST/DroneList";
import Mountains from "../components/mountains";
import DotList from "../droneLIST/droneav";

export default function Success() {
  const context = useContext(isLoggedInContext);

  if (!context) {
    throw new Error("useContext must be used within an IsLoggedInProvider");
  }

  const { loggedIn } = context;

  return (
    <>
      {loggedIn ? (
        <>
        <MapAP />
        <DotList/>
        <DroneList />
        </>
      ) : (
        <div className="main bg">
          <div className="login_container">
            <p className="logo_text"style={{ margin: "40px 0" }}>It seems like you are not logged in</p>
            <Mountains />
            <div className="cld-container">
              <div className="cld">
                { <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

