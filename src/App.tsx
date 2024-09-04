import React from "react";
import "./styles/App.css";
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
