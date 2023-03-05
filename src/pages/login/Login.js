import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  const handleChangeInput = (e) => {
    let { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let { username, password } = input;
    console.log(username, password);

    let filteredUsers = users.filter((user) => {
      return user.username === username && user.username === password;
    });

    if (filteredUsers.length > 0) {
      console.log("Bener", filteredUsers);
      Cookies.set("user", JSON.stringify(filteredUsers), { expires: 3 });
      Swal.fire({
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/dashboard");
    } else {
      console.log("Salah");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Username or Password Wrong!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-bold text-gray-600 dark:text-white">
          Login Page
        </div>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-6">
            <input
              onChange={handleChangeInput}
              value={input.username}
              name="username"
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
              placeholder="username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              onChange={handleChangeInput}
              value={input.password}
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-center"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
