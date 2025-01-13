const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access Denied' });

    if (!token.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Invalid token format' });
    }


    try {
        const verified = JWT.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};

module.exports = verifyToken;