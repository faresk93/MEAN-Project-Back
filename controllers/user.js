const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const body = req.body;
    try {
        const passwordHash = await bcrypt.hash(body.password, 10);
        const user = new User({
            email: body.email,
            password: passwordHash
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({
                message: 'Error: ' + e
            })
        }
    } catch (e) {

    }
};
exports.login = (req, res, next) => {

};
