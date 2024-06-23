import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

const Router = () => {
  // <Route exacth path="/profile/:username" Component={Profile} />
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route exacth path="/home" Component={Home} />
        <Route exacth path="/profile/:username" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
