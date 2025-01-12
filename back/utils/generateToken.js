const JWT = require('jsonwebtoken');

const generateToken = (user) => {
    const data = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const signature = process.env.JWT_SECRET;
    return JWT.sign(data, signature, { expiresIn: '1h' });
};

module.exports = generateToken;