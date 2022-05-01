import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import dayjs from "dayjs";
import "./index.css";

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const params = useParams();

  useEffect(() => {
    api
      .getPosts(params.postID)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    api
      .getComments(params.postID)
      .then((data) => setComments(data))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="page">
      <div className="post">
        <h1>{post?.title}</h1>
        <p className='date'>{dayjs(post?.created_at).format("DD.MM.YYYY, HH:mm:ss")}</p>
        <div className='author'>{post?.author.name}</div>
        <img src={post?.image} />
        <p>{post?.text}</p>
      </div>
      <div className="comments">
        {comments?.map((el) => (
          <div key={el._id}>
            <div className="author">{el.author.name}</div>
            <div className="date">
              {dayjs(el.created_at).format("DD.MM.YYYY, HH:mm:ss")}
            </div>
            <p> {el.text}</p>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
};
