import { useContext } from "react";
import MapAP from "../components/MapAP";
import isLoggedIncontext from "../context/context";

export default function Success() {
  const loggedIn = useContext(isLoggedIncontext);
  return (
    <>
      {loggedIn ? <MapAP /> : <h1>Not logged in</h1>}
    </>
  );
}
