import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data;

    const postWithUsers = await Promise.all(
      posts.map(async (post) => {
        const userResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`
        );
        const user = userResponse.data;
        return { ...post, user };
      })
    );

    setPosts(postWithUsers);
  };

  const fetchComments = async (postId) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: response.data,
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      fetchComments(post.id);
    });
  }, [posts]);

  const getTotalComments = (postId) => {
    return comments[postId] ? comments[postId].length : 0;
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(currentPage);
  };

  const filteredPosts = currentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="md:container mx-auto px-3 lg:w-5/6">
      <div className="flex flex-col">
        <div className="flex justify-center w-auto mb-6">
          <h5 className="text-xl font-bold dark:text-white text-gray-400 border-b-2 border-blue-500 p-3">
            Post
          </h5>
        </div>
        <div className="flex justify-center mb-6">
          <form className="w-1/2">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
            </div>
          </form>
        </div>
        {filteredPosts.map((post) => (
          <div className="flex justify-center mb-3" key={post.id}>
            <div className="flex w-1/2">
              <h6 className="text-lg font-bold dark:text-white w-1/4">
                {post.user.name}
              </h6>
              <div className="w-3/4 flex flex-col">
                <p className="text-justify">{post.title}</p>
                <p className="flex">
                  <Link to={`/detail-comment/${post.id}`} className="flex">
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
                    <span className="text-blue-500">
                      {getTotalComments(post.id)}
                    </span>
                  </Link>
                  <Link
                    to={`/detail-posting/${post.id}`}
                    className="ml-6 text-blue-500"
                  >
                    Detail
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <div className="flex w-1/2 justify-end">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center items-center mb-6">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item mx-2">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Dashboard;
