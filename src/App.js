import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Greeting } from "./components/Greeting";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api.react-learning.ru/posts", {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlNzkwYTBjZGQ3ZDNmZDUyZjg1MGYiLCJpYXQiOjE2NTAzNTg1NDksImV4cCI6MTY4MTg5NDU0OX0.8efDFKmRpuhdYy0uUMVo88FJ5ULUB3ofe9ED5NijsVI",
      },
    })
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log(error.message));
  }, []);

  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch("https://api.react-learning.ru/users/me", {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlNzkwYTBjZGQ3ZDNmZDUyZjg1MGYiLCJpYXQiOjE2NTAzNTg1NDksImV4cCI6MTY4MTg5NDU0OX0.8efDFKmRpuhdYy0uUMVo88FJ5ULUB3ofe9ED5NijsVI",
      },
    })
      .then((response) => response.json())
      .then((result) => setUserInfo(result))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <Header userInfo={userInfo} />
      <Greeting />
      <PostList mapPosts={posts} />
      <Footer />
    </div>
  );
}

export default App;
