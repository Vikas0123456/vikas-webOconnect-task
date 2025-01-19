import { useState, useEffect } from 'react';
import axios from 'axios';
import LikeButton from '../like-dislike/page';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/posts`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLikeChange = (postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isLiked } : post
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Posts Feed
      </Typography>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.username}</Typography>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          <CardActions>
            <LikeButton
              postId={post.id}
              isLiked={post.isLiked}
              onLikeChange={(isLiked) => handleLikeChange(post.id, isLiked)}
            />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
