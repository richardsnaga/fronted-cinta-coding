import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import Dashboard from "../pages/dashboard/Dashboard";
import DetailPosting from "../pages/detail-posting/DetailPosting";
import DetailProfile from "../pages/detail-profile/DetailProfile";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LayoutLanding from "../widggets/LayoutLanding";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routes>
        <Route
          path="/"
          element={
            <LayoutLanding>
              <Home />
            </LayoutLanding>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detail-profile" element={<DetailProfile />} />
        <Route path="/detail-posting" element={<DetailPosting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
