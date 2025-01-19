import { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function LikeButton({ postId, isLiked, onLikeChange }) {
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await axios.delete(`${process.env.API_URL}/posts/${postId}/like`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      } else {
        await axios.post(`${process.env.API_URL}/posts/${postId}/like`, {}, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      }
      onLikeChange(!isLiked);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton onClick={handleLike} disabled={loading}>
      {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOffAltIcon />}
    </IconButton>
  );
}
