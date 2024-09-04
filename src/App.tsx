import React,{useState} from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import isLoggedIncontext from  "./context/context";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Main from "./views/main";
import LogIn from "./components/login";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      // <isLoggedIncontext.Provider value={isLoggedIn}>
      <>
        <Route path="/" element={<LogIn />} />
        <Route path="/main" element={<Main />} />
        </>
      // </isLoggedIncontext.Provider>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
