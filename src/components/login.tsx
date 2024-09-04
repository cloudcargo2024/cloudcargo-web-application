import React from "react";
import Mountains from "./mountains";
import "../styles/login.css";

import LogInForm from "./LogInForm";

export default function LogIn() {
  return (
    <div className="main bg">
      <div className="login_container">
        <p className="logo_text">CloudCargo</p>
        <LogInForm />
        <Mountains />
      </div>
    </div>
  );
}
