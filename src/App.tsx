import React, { useState } from "react";
import logo from "./logo.svg";
import "./styles/App.css";
import isLoggedIncontext from "./context/context";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Main from "./views/main";
import LogIn from "./components/login";

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