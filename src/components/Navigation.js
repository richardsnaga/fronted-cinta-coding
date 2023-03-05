import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar fluid={false} rounded={true}>
      <div className="container flex flex-wrap items-center justify-between mx-auto p-3 lg:w-5/6">
        <Navbar.Brand href="https://flowbite.com/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Cinta Coding
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/login"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </Link>
            </li>
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
