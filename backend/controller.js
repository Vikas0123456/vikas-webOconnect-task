const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./config');

// User registration
const registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err) => {
            if (err) {
                throw new Error('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email and password are required');
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err || results.length === 0) {
                throw new Error('Invalid credentials');
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    } catch (error) {
        res.status(401).send(error.message || 'Authentication Failed');
    }
};

// Create a post
const createPost = (req, res) => {
    try {
        const { content } = req.body;

        const query = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
        db.query(query, [req.user.id, content], (err) => {
            if (err) {
                throw new Error('Error creating post');
            }
            res.status(200).send('Post created successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// Get all posts
const getPosts = (req, res) => {
    try {
        const query = `
            SELECT p.id, p.content, p.created_at, u.username 
            FROM posts p 
            JOIN users u ON p.user_id = u.id 
            ORDER BY p.created_at DESC
        `;
        db.query(query, (err, results) => {
            if (err) {
                throw new Error('Error fetching posts');
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// Like a post
const likePost = (req, res) => {
    try {
        const { postId } = req.params;

        const query = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';
        db.query(query, [req.user.id, postId], (err) => {
            if (err) {
                throw new Error('Error liking post');
            }
            res.status(200).send('Post liked successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// Unlike a post
const unlikePost = (req, res) => {
    try {
        const { postId } = req.params;

        const query = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';
        db.query(query, [req.user.id, postId], (err) => {
            if (err) {
                throw new Error('Error unliking post');
            }
            res.status(200).send('Post unliked successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// Follow a user
const followUser = (req, res) => {
    try {
        const { userId } = req.params;

        const query = 'INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)';
        db.query(query, [req.user.id, userId], (err) => {
            if (err) {
                throw new Error('Error following user');
            }
            res.status(200).send('User followed successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

// Unfollow a user
const unfollowUser = (req, res) => {
    try {
        const { userId } = req.params;

        const query = 'DELETE FROM follows WHERE follower_id = ? AND followed_id = ?';
        db.query(query, [req.user.id, userId], (err) => {
            if (err) {
                throw new Error('Error unfollowing user');
            }
            res.status(200).send('User unfollowed successfully');
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

module.exports = {
    registration,
    login,
    createPost,
    getPosts,
    likePost,
    unlikePost,
    followUser,
    unfollowUser,
};
