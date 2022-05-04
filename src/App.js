import React from "react";
import { useState, useEffect } from "react";
import { PostList } from "./components/PostList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Greeting } from "./components/Greeting";
import { AddPost } from "./components/AddPost";
import { Routes, Route, Link } from "react-router-dom";
import { PostPage } from "./components/PostPage";
import { SignIn } from "./components/SignIn";
import { useApi } from "./hooks/useApi";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [like, setLike] = useState(JSON.parse(localStorage.getItem("likes")));
  const api = useApi();
  const { readLS } = useLocalStorage();

  const token = readLS("token");

  useEffect(() => {
    api.getPosts().then((result) => {
      setPosts(result.reverse());
    });
  }, [userInfo]);

  return (
    <div>
      <Header userInfo={userInfo}
      setUserInfo={setUserInfo} />
      <Routes>
        {(token)?(<Route
          path="/"
          element={
            <div>
              <Greeting />;
              <PostList
                mapPosts={posts}
                like={like}
                setLike={setLike}
                userInfo={userInfo}
              />
            </div>
          }
        />):(<Route path="/" element={<SignIn setUserInfo={setUserInfo} />} />)}
        <Route path="create" element={<AddPost />} />
        <Route path="posts/:postID" element={<PostPage />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
