import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import api from "../../utils/api";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export const Post = ({ postsKey, isLiked, setLike, userInfo }) => {
  const [liked, setLiked] = useState(postsKey.likes.length);
  const navigate=useNavigate()

  const addLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key)) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key));
    const filteredStorage = storage.filter((itemID) => value !== itemID);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  const getLike = () => {
    addLS("likes", postsKey._id);
    setLike((prevState) => [...prevState, postsKey._id]);
    api
      .addLike(postsKey._id)
      .then((addedItem) => {
        setLiked(addedItem.likes.length);
      })
      .catch((err) => alert("Ошибка"));
  };

  const removeLike = () => {
    removeLS("likes", postsKey._id);
    setLike((prevState) =>
      prevState.filter((itemID) => postsKey._id !== itemID)
    );
    api
      .deleteLike(postsKey._id)
      .then((removedItem) => {
        setLiked(removedItem.likes.length);
      })
      .catch((err) => alert(`${err.message}`));
  };

  const deletePost = () => {
    api
      .deletePosts(postsKey._id)
      .then((res) => {
        document.location.reload();
      })
      .catch((err) => alert(err));
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom >
          <Link to={`posts/${postsKey._id}`}>{postsKey.title}</Link>
        </Typography>
        <hr />
        <Typography variant="h9" component="div" color="text.secondary">
          👤 {postsKey.author.name}
        </Typography>
        <br />
        <CardMedia
        component="img"
        height="auto"
        image={postsKey.image}
        alt="Изображение"
      />
        <br />
        <Typography variant="body2">{postsKey.text}</Typography>
        <br />
        <Typography variant="h8" color="text.secondary">
          {dayjs(postsKey.created_at).format("DD.MM.YYYY, HH:mm:ss")}
        </Typography>
        <br />
        <Typography variant="h7" color="text.secondary">
          Last edit {dayjs(postsKey.updated_at).format("DD.MM.YYYY, HH:mm:ss")}
        </Typography>
        <br />

        {isLiked  ? (
          <IconButton onClick={removeLike}>
            <FavoriteIcon fontSize="small" />
            <p style={{ fontSize: "small" }}>{liked}</p>
          </IconButton>
        ) : (
          <IconButton onClick={getLike}>
            <FavoriteBorderIcon fontSize="small" />
            <p style={{ fontSize: "small" }}>{liked}</p>
          </IconButton>
        )}
        {(userInfo._id == postsKey.author._id) && (<IconButton onClick={deletePost}>
          <DeleteOutlinedIcon />
        </IconButton>)}
        {(postsKey.comments.length>0) &&(<IconButton>
        <ForumOutlinedIcon fontSize="small"/>
        <p style={{ fontSize: "small" }}>{postsKey.comments.length}</p>
        </IconButton>)}
      </CardContent>
    </Card>
  );
};
