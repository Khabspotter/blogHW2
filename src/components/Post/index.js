import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import dayjs from 'dayjs';
import IconButton, { IconButtonProps } from '@mui/material/IconButton'



export const Post = ({postsKey}) => {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {postsKey.title}
        </Typography>
        <hr/>
        <Typography variant="h9" component="div" color="text.secondary">
        👤 {postsKey.author.email}
        </Typography>
        <br/>
        <Typography variant="body2">
          {postsKey.text}
        </Typography>
        <br/>
        <Typography variant="h8" color="text.secondary">
          {dayjs(postsKey.created_at).format('DD.MM.YYYY, HH:mm:ss')}
        </Typography>
       <br/>
        <Typography variant="h7" color="text.secondary">
         Last edit {dayjs(postsKey.updated_at).format('DD.MM.YYYY, HH:mm:ss')}
        </Typography>
        <br/>
        <IconButton>
        <FavoriteBorderIcon fontSize="small"/><p style={{'fontSize': 'small'}}>{postsKey.likes.length}</p>
        </IconButton>
      </CardContent>
    </Card >
  )
}
