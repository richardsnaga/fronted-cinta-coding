import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar fluid={false} rounded={true}>
      <div className="container flex flex-wrap items-center justify-between mx-auto px-3 lg:w-5/6">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white">
            Cinta Coding
          </span>
        </Navbar.Brand>
        <div className="flex items-center">
          <Link
            to="/login"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm md:px-10 px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 self-center"
          >
            Login
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
