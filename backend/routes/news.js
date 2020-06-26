const express = require('express');
const axios = require('axios')
const config = require('config');
const { User } = require('../models/user');
const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const user = await User.findById(req.user._id)
    const sources = user.subscribes.join();
    const endPointUrl = `${config.get('news-api-url')}/everything?sources=${sources}&apiKey=${config.get('news-api-key')}`

    if (!sources) return res.send({ message: "You don't have any subscription" });

    try {
        const { data } = await axios.get(endPointUrl);
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }
})


module.exports = newsRouter