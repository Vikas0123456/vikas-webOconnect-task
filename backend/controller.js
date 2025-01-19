const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./config');

// User registration
const registration = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Error registering user');
      res.status(201).send('User registered successfully');
    });
  }

// User login
const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
  
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err || results.length === 0) return res.status(401).send('Invalid credentials');
  
      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) return res.status(401).send('Invalid credentials');
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  }

// Create a post
const createPost = (req, res) => {
    const { content } = req.body;
    const query = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';

    db.query(query, [req.user.id, content], (err) => {
        if (err) return res.status(500).send('Error creating post');
        res.status(200).send('Post created successfully');
    });
};

// Get all posts
const getPosts = (req, res) => {
    const query = 'SELECT p.id, p.content, p.created_at, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error fetching posts');
        res.json(results);
    });
};

// Like a post
const likePost = (req, res) => {
    const { postId } = req.params;
    const query = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';

    db.query(query, [req.user.id, postId], (err) => {
        if (err) return res.status(500).send('Error liking post');
        res.status(200).send('Post liked successfully');
    });
};

// Unlike a post
const unlikePost = (req, res) => {
    const { postId } = req.params;
    const query = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';

    db.query(query, [req.user.id, postId], (err) => {
        if (err) return res.status(500).send('Error unliking post');
        res.status(200).send('Post unliked successfully');
    });
};

// Follow a user
const followUser = (req, res) => {
    const { userId } = req.params;
    const query = 'INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)';

    db.query(query, [req.user.id, userId], (err) => {
        if (err) return res.status(500).send('Error following user');
        res.status(200).send('User followed successfully');
    });
};

// Unfollow a user
const unfollowUser = (req, res) => {
    const { userId } = req.params;
    const query = 'DELETE FROM follows WHERE follower_id = ? AND followed_id = ?';

    db.query(query, [req.user.id, userId], (err) => {
        if (err) return res.status(500).send('Error unfollowing user');
        res.status(200).send('User unfollowed successfully');
    });
};

module.exports = {
    registration, login, createPost, getPosts, likePost, unlikePost, followUser, unfollowUser
}