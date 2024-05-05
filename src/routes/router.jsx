import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Dashboard from "../views/dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
