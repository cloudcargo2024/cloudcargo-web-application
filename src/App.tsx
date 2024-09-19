import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./routes/login";
import Main from "./routes/main/main";
import InformationForAdmins from "./routes/InformationForAdmins";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: (
        <div className="main bg">
          <LogIn />
        </div>
      ),
    },
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/InfoForAdmin",
      element: <InformationForAdmins />,
    },
  ]);

  return <RouterProvider router={router} />;
}


export default App;
