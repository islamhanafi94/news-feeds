const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const { User } = require('../models/user');

const authRouter = express.Router();



authRouter.post('/', async (req, res) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        const errorMessages = error.details.map((error) => {
            return error.message
        });
        return res.status(400).send(errorMessages)
    }

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken();

    return res.header('x-auth-token', token).status(200).send('ok');
})

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = authRouter;