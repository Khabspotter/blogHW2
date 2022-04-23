import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Greeting } from "./components/Greeting";
import api from './utils/api'
import { getPopoverUtilityClass } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like,setLike] = useState(JSON.parse(localStorage.getItem('likes')))

  useEffect(() => {
    api.getPosts()
      .then((result) => setPosts(result))
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then((result) => setUserInfo(result))
  }, []);


  return (
    <div>
      <Header userInfo={userInfo} />
      <Greeting />
      <PostList mapPosts={posts} like={like} setLike={setLike}/>
      <Footer />
    </div>
  );
}

export default App;
