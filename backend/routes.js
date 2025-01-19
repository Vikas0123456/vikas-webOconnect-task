const express = require('express');
const { registration, login, createPost, getPosts, likePost, unlikePost, followUser, unfollowUser } = require('./controller');
const authenticateToken = require('./authentication');
const app = express.Router();


app.post('/register', registration)
app.post('/login', login)
app.post('/posts', authenticateToken, createPost);
app.get('/posts', authenticateToken, getPosts);
app.post('/posts/:postId/like', authenticateToken, likePost);
app.delete('/posts/:postId/like', authenticateToken, unlikePost);
app.post('/users/:userId/follow', authenticateToken, followUser);
app.delete('/users/:userId/follow', authenticateToken, unfollowUser);

module.exports = app;