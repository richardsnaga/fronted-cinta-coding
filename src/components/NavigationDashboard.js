import { Dropdown, Navbar } from "flowbite-react";
import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationDashboard = () => {
  let navigate = useNavigate();

  const user = JSON.parse(Cookies.get("user"));
  console.log("user", user);
  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/login");
  };
  return (
    <Navbar fluid={false} rounded={true}>
      <div className="container flex flex-wrap items-center justify-between mx-auto px-3 lg:w-5/6">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            Cinta Coding
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            label={
              <span className="text-xl font-bold dark:text-white">
                Welcome,{" "}
                <span className="text-xl font-bold text-blue-500">
                  {user[0].name}
                </span>
              </span>
            }
            inline={true}
          >
            <Link to={`/detail-profile/${user[0].id}`}>
              <Dropdown.Item>Detail Profile</Dropdown.Item>
            </Link>
            <Link onClick={handleLogout}>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Link>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationDashboard;
