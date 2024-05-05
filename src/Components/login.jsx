import React, { useState } from "react";
import ChecPolicy from "./checPolicy";

const Login = () => {
  const [checked, setChecked] = useState(false);
  const googleAuth = async () => {
    try {
      // Realiza una solicitud al backend para iniciar sesión con Google
      window.location.href = "http://localhost:4000/auth/google";
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="container">
      <div className="form_container">
        <div className="left">
          <img className="img" src="./images/login.jpg" alt="login" />
        </div>
        <div className="right">
          <h2 className="from_heading">Members Log in</h2>
          <ChecPolicy checked={checked} setChecked={setChecked}/>
          <button className={checked ? 'google_btn' : 'google_btn_disable'} onClick={googleAuth} disabled={!checked}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sing in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
