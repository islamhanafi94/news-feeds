const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const { User, registerFormValidation } = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.get('/me', authMiddleware, async (req, res) => {
    if (!req.user) return res.status(401).send('Unauthorized');

    try {
        user = await User.findById(req.user._id, "-password");
        return res.send(user)
    } catch (error) {
        return res.send({ status: "error", message: error })
    }
})
userRouter.post('/', async (req, res) => {
    const { error } = registerFormValidation(req.body);
    if (error) {
        const errorMessages = error.details.map((error) => {
            return error.message
        });
        return res.status(400).send(errorMessages)
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')


    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    return res.header('x-auth-token', token).status(201).send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
})




module.exports = userRouter;