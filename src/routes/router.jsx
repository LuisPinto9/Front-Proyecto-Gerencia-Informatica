import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/home/Home";
import LoginP from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exact path="/login" Component={LoginP} />
        <Route exacth path="/dashboard" Component={Dashboard} />
        <Route exacth path="/home" Component={Home} />
        <Route exacth path="/profile" Component={Profile} />
        <Route exacth path="/Register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
