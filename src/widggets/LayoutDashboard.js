import React from "react";
import NavigationDashboard from "../components/NavigationDashboard";

const LayoutDashboard = (props) => {
  return (
    <>
      <NavigationDashboard />
      <div className="mx-auto px-4">{props.children}</div>
    </>
  );
};

export default LayoutDashboard;
