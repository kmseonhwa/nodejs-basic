import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };
const jwtSecretKey =
    '5A2C7BF749A5C6BBFEE86370DB9D8F6BD108191D8DF4FA75DF82190E87230F5E';

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    // TODO: Make it secure
    jwt.verify(token, jwtSecretKey, async (error, decoded) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        console.log(`decoded: ${decoded}`);
        const user = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = user.id; // request custom
        next();
    });
    req.token = token;
};
