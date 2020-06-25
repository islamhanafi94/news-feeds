const express = require('express');
const axios = require('axios')

const { User } = require('../models/user');
const newsRouter = express.Router();


newsRouter.get('/', async (req, res) => {
    const user = await User.findById(req.user._id)
    const sources = user.subscribes.join();

    if (!sources) return res.send({ message: "You don't have any subscription" });

    try {
        const { data } = await axios.get(`https://newsapi.org/v2/everything?sources=${sources}&apiKey=${process.env.API_KEY}`);
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }

})


module.exports = newsRouter