import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export default function FollowButton({ userId, isFollowing, onFollowChange }) {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await axios.delete(`${process.env.API_URL}/users/${userId}/follow`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      } else {
        await axios.post(`${process.env.API_URL}/users/${userId}/follow`, {}, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      }
      onFollowChange(!isFollowing);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? 'outlined' : 'contained'}
      color="primary"
      onClick={handleFollow}
      disabled={loading}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
