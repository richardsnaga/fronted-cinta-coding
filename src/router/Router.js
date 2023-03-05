import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import DetailPosting from "../pages/detail-posting/DetailPosting";
import DetailProfile from "../pages/detail-profile/DetailProfile";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import LayoutDashboard from "../widggets/LayoutDashboard";
import LayoutLanding from "../widggets/LayoutLanding";
import NotFound from "../pages/not-found/NotFound";
import Tes from "../pages/Tes";
import DetailComment from "../pages/detail-comment/DetailComment";

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
      <Routes>
        <Route path="*" element={<NotFound />} />
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
        <Route
          path="/detail-profile/:id"
          element={
            <DashboardRoute>
              <LayoutDashboard>
                <DetailProfile />
              </LayoutDashboard>
            </DashboardRoute>
          }
        />
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
        <Route
          path="/detail-comment/:id"
          element={
            <DashboardRoute>
              <LayoutDashboard>
                <DetailComment />
              </LayoutDashboard>
            </DashboardRoute>
          }
        />
        {/* <Route path="/tes" element={<Tes />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
