const jwt = require('jsonwebtoken');
const userController = require('../controllers/user');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'test');
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw decodedToken.userId + ' userId: ' + userId;
        } else {
            next();
        }
    } catch (e) {
        res.status(401).json({
            error: e
        })
    }
};
