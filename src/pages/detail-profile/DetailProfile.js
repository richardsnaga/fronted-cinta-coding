import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

const DetailProfile = () => {
  const user = JSON.parse(Cookies.get("user"));
  console.log("user", user);
  return (
    <div className="md:container mx-auto px-3 lg:w-5/6">
      <div className="flex flex-col">
        <div className="flex justify-center w-auto mb-6">
          <h5 className="text-xl font-bold dark:text-white text-gray-400 border-b-2 border-blue-500 p-3">
            Post
          </h5>
        </div>
        <div className="flex justify-center mb-6">
          <div className="w-1/2">
            <Link to={"/dashboard"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex justify-center mb-3 pl-40">
          <div className="flex w-1/2">
            <h6 className="text-lg font-normal dark:text-white ">
              Username :&emsp;&emsp;&emsp;
            </h6>
            <h6 className="text-lg font-normal dark:text-white ">
              {user[0].username}
            </h6>
          </div>
        </div>
        <div className="flex justify-center mb-3 pl-40">
          <div className="flex w-1/2">
            <h6 className="text-lg font-normal dark:text-white ">
              Email&emsp;&emsp;&ensp;:&emsp;&emsp;&emsp;
            </h6>
            <h6 className="text-lg font-normal dark:text-white ">
              {user[0].email}
            </h6>
          </div>
        </div>
        <div className="flex justify-center mb-3 pl-40">
          <div className="flex w-1/2">
            <h6 className="text-lg font-normal dark:text-white ">
              Address&emsp;&ensp;:&emsp;&emsp;&emsp;
            </h6>
            <h6 className="text-lg font-normal dark:text-white ">
              {user[0].address.street}
            </h6>
          </div>
        </div>
        <div className="flex justify-center mb-3 pl-40">
          <div className="flex w-1/2">
            <h6 className="text-lg font-normal dark:text-white ">
              Phone&emsp;&emsp;:&emsp;&emsp;&emsp;
            </h6>
            <h6 className="text-lg font-normal dark:text-white ">
              {user[0].phone}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
