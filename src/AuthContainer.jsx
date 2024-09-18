// src/components/AuthContainer.js
import React, { useState } from "react";
import Login from "./components/login/login";
import Register from "./components/register/register";

const AuthContainer = ({ setIsLoggedIn }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? (
        <Register />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setShowRegister={setShowRegister} />
      )}
    </div>
  );
};

export default AuthContainer;
