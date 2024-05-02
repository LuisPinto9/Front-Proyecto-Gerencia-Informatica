import React from "react";

const Login = () => {
  const googleAuth = () => {
    alert("botonLogin");
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
