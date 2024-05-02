import React from "react";
import axios from "axios";

const Login = () => {
  const googleAuth = async () => {
    try {
      // Realiza una solicitud al backend para iniciar sesión con Google
      const response = await axios.get("http://localhost:4000/login/auth/google");
      
      // Si la solicitud es exitosa, redirige al usuario a la URL de autenticación de Google
      console.log(response);
      // window.location.href = response.data.redirectUrl;
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
          <button className="google_btn" onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sing in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
