import React, { ReactNode, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import isLoggedIncontext from "./context/context";

interface ProviderProps {
  children: ReactNode;
}

const IsLoggedInProvider = ({ children }: ProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <isLoggedIncontext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </isLoggedIncontext.Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <IsLoggedInProvider>
      <App />
    </IsLoggedInProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
