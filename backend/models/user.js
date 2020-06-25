const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    subscribes: [String]
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        }
        , process.env.JWT_SECRET);
    return token;
}

const registerFormValidation = (user) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        repeatPassword: Joi.ref('password'),
    }).with('password', 'repeatPassword')


    return schema.validate(user, { abortEarly: false })
}

const User = mongoose.model('user', userSchema);
exports.User = User;
exports.registerFormValidation = registerFormValidation