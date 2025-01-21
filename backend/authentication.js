const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Access denied');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
};

module.exports = authenticateToken;
