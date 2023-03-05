import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
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
    setCurrentPage(1);
  };

  const filteredPosts = currentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Posts</h1>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>Author: {post.user.name}</p>
          <p>Total comments: {getTotalComments(post.id)}</p>
        </div>
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
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
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
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

export default PostList;
