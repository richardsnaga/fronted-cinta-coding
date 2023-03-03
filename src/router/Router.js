import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import DetailPosting from "../pages/detail-posting/DetailPosting";
import DetailProfile from "../pages/detail-profile/DetailProfile";
import Login from "../pages/login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail-profile" element={<DetailProfile />} />
        <Route path="/detail-posting" element={<DetailPosting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
