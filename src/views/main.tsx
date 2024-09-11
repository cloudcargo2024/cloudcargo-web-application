import { useContext } from "react";
import MapAP from "../components/MapAP";
import isLoggedIncontext from "../context/context";

export default function Success() {
  var context = useContext(isLoggedIncontext);
  if (!context) {
    throw new Error("useContext must be used within an IsLoggedInProvider");
  }
  const { loggedIn } = context;
  return <>{loggedIn ? <MapAP /> : <h1>Not logged in</h1>}</>;
}
