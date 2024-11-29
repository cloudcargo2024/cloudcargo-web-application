import { useContext } from "react";
import MapAP from "../components/MapAP";
import isLoggedInContext from "../context/context";
import "../context/context.css";
import Mountains from "../components/mountains";
import DroneFlight from "../components/DroneFlight";
import MainDrones from "../components/DroneSection";
import "../styles/main.css";
import DroneList from "../components/DroneList";

export default function Success() {
  const context = useContext(isLoggedInContext);

  if (!context) {
    throw new Error("useContext must be used within an IsLoggedInProvider");
  }

  const { loggedIn } = context;

  return (
    <>
      {loggedIn ? (
        <div className="main-components">
          <MapAP />
          <DroneList />
          {/* <div className="drone-buttons">
            <DroneFlight />
          </div> */}
        </div>
      ) : (
        <div className="main bg">
          <div className="login_container">
            <p className="logo_text">It seems like you are not logged in</p>
            <Mountains />
            <div className="cld-container">
              <div className="cld">
                {
                  <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
