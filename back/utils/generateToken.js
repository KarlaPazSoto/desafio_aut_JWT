const JWT = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET no está definido');
    }

    const data = {
        id: user.id,
        email: user.email,
        rol: user.rol,
    };
    const signature = process.env.JWT_SECRET;
    
    const token = JWT.sign(data, signature, { expiresIn: '1h' });
    
    return token;
};

module.exports = generateToken;