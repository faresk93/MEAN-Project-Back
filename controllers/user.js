const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateRandomString = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
const randomString = generateRandomString(20);

exports.getRandomString = () => {
    return randomString;
};

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
        return res.status(500).json({
            error: new Error('Error signing up.\n' + e)
        })
    }
};
exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const user = await User.findOne({email: body.email});
        if (!user) {
            return res.status(401).json({
                error: new Error('User not found')
            })
        }
        try {
            const valid = await bcrypt.compare(body.password, user.password);
            if (!valid) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                })
            }
            // token configuration
            const token = jwt.sign(
                {userId: user._id},
                'test',
                {expiresIn: '24h'}
            );
            res.status(200).json({
                userId: user._id,
                token: token
            });
        } catch (e) {
            return res.status(500).json({
                error: 'Invalid credentials!'
            })
        }

    } catch (e) {
        return res.status(500).json({
            error: new Error('Error logging in.\n' + e)
        })
    }
};
