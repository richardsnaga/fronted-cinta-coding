import React from "react";
import Navigation from "../components/Navigation";

const LayoutLanding = (props) => {
  return (
    <>
      <Navigation />
      <div className="mx-auto px-4">{props.children}</div>
    </>
  );
};

export default LayoutLanding;
