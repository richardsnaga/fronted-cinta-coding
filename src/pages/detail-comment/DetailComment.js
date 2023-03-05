import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailComment = () => {
  let { id } = useParams();
  console.log(id);

  const [dataPost, setDataPost] = useState({});
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setDataPost(res.data);
        console.log("post", res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        // console.log("comment", res.data);
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
  console.log("comments", comments);

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

        <div className="flex justify-center mb-6">
          <div className="flex w-1/2">
            <h6 className="text-lg font-bold dark:text-white w-1/4">
              {user.name}
            </h6>
            <div className="w-3/4 flex flex-col">
              <p className="text-justify mb-4 opacity-80">{dataPost.title}</p>
              <p className="text-justify mb-2 opacity-50">{dataPost.body}</p>
            </div>
          </div>
        </div>
        <h6 className="text-lg font-bold dark:text-white flex justify-center opacity-40">
          --- All Comment ---
        </h6>
        {comments !== null &&
          comments.map((res, index) => {
            return (
              <div className="flex justify-center mb-3" key={res.id}>
                <div className="flex w-1/2">
                  <h6 className="text-lg font-semibold dark:text-white w-1/4">
                    {res.name}
                  </h6>

                  <div className="w-3/4 flex flex-col">
                    <p className="text-justify mb-4 opacity-80">{res.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailComment;
