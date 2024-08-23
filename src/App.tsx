import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import LogIn from "./routes/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      //<LogIn />,
      element: (
        <div>
          <h1>Hello world!</h1>
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
