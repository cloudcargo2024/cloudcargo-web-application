import React, { useContext, useState } from "react";
import users from "../localDB/users.json";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import user from "../models/userModel";
import isLoggedIncontext from "../context/context";

export default function LogInForm() {
  const [usersData, setUsersData] = useState<user[]>(users);
  const navigate = useNavigate();

  const context = useContext(isLoggedIncontext);

  if (!context) {
    throw new Error("useContext must be used within an IsLoggedInProvider");
  }

  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");

  const { loggedIn, setLoggedIn } = context;

  function login() {
    navigate("/main");
  }

  function validateLogin(event: React.FormEvent) {
    event.preventDefault();
    let isValidUser = false;
    usersData.forEach(({ id, email, password }) => {
      if (email === inputEmail && password === inputPassword) {
        isValidUser = true;
        setLoggedIn(true);
        login();
      }
    });

    if (isValidUser === false) alert("Incorrect email or password!");
  }

  return (
    <form onSubmit={validateLogin}>
      <label className="form_label ">
        Email:{" "}
        <input
          className="text_input"
          type="email"
          name="email"
          autoComplete="off"
          value={inputEmail}
          onChange={(e) => {
            setInputEmail(e.target.value);
          }}
        />
      </label>
      <label className="form_label ">
        Password:{" "}
        <input
          className="text_input"
          type="password"
          name="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </label>
      <div className="info ">
        How do I get an admin account?
        <p className="tooltip_text">
          If you are a rescue team, trying to setup a drone system in your area,
          you should contact an official from CloudCargo, and reach to local
          emergency services, for more details and authorizations.
        </p>
      </div>
      <button type="submit" className="submit_button">
        Log in
      </button>
    </form>
  );
}
