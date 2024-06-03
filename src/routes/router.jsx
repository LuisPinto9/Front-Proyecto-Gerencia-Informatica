import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
