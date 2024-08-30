import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Main from "./routes/main/main";
import LogIn from "./routes/login";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LogIn />} />
        <Route path="/main" element={<Main />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
