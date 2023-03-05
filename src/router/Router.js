import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "../components/Navigation";
import Dashboard from "../pages/dashboard/Dashboard";
import DetailPosting from "../pages/detail-posting/DetailPosting";
import DetailProfile from "../pages/detail-profile/DetailProfile";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LayoutDashboard from "../widggets/LayoutDashboard";
import LayoutLanding from "../widggets/LayoutLanding";

const Router = () => {
  let LoginRoute = (param) => {
    if (Cookies.get("user") === undefined) {
      return param.children;
    } else if (Cookies.get("user") !== undefined) {
      return <Navigate to={"/dashboard"} />;
    }
  };
  let DashboardRoute = (param) => {
    if (Cookies.get("user") === undefined) {
      return <Navigate to={"/login"} />;
    } else if (Cookies.get("user") !== undefined) {
      return param.children;
    }
  };
  return (
    <BrowserRouter>
      {/* <Navigation /> */}
      <Routes>
        <Route
          path="/"
          element={
            <LoginRoute>
              <LayoutLanding>
                <Home />
              </LayoutLanding>
            </LoginRoute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardRoute>
              <LayoutDashboard>
                <Dashboard />
              </LayoutDashboard>
            </DashboardRoute>
          }
        />
        <Route path="/detail-profile" element={<DetailProfile />} />
        <Route
          path="/detail-posting/:id"
          element={
            <DashboardRoute>
              <LayoutDashboard>
                <DetailPosting />
              </LayoutDashboard>
            </DashboardRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
