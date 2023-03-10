import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailPosting = () => {
  let { id } = useParams();
  console.log(id);

  const [dataPost, setDataPost] = useState({});
  const [totalComment, setTotalComment] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setDataPost(res.data);
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => {
        setTotalComment(res.data.length);
        console.log("comment", res.data);
      });
  }, [dataPost]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${dataPost.userId}`)
      .then((res) => {
        setUser(res.data);
        console.log("useer", res.data);
      });
  }, [dataPost]);
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

        <div className="flex justify-center">
          <div className="flex w-1/2">
            <h6 className="text-lg font-bold dark:text-white w-1/4">
              {user.name}
            </h6>
            <div className="w-3/4 flex flex-col">
              <p className="text-justify mb-4 opacity-80">{dataPost.title}</p>
              <p className="text-justify mb-2 opacity-50">{dataPost.body}</p>
              <Link to={`/detail-comment/${id}`}>
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                  </svg>
                  <span className="text-blue-500">{totalComment}</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPosting;
