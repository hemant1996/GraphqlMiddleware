const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.user = async function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const user = await User.findById(jwt.verify(token, process.env.JWT_KEY)._id);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).send('Invalid token.');
        }
    } catch (e) {
        console.error(token);
        console.error(req.path);
        console.error(e);
        res.status(401).send('Invalid token.');
    }
}