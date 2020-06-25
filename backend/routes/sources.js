const express = require('express');
const axios = require('axios')

const { User } = require('../models/user');
const sourceRouter = express.Router();


sourceRouter.get('/all', async (req, res) => {
    try {
        const { data } = await axios.get(`https://newsapi.org/v2/sources?language=en&apiKey=${process.env.API_KEY}`)
        return res.send(data.sources);

    } catch (error) {
        console.log(error);
        return res.status(400).send({ "error": error })
    }
})

sourceRouter.get('/', async (req, res) => {
    const { subscribes } = await User.findById(req.user._id).select('subscribes');
    if (!subscribes) return res.send([]);
    return res.send(subscribes)
})


sourceRouter.put('/', async (req, res) => {
    const { sourceID } = req.body;

    if (!sourceID) return res.status(400).send('no source id');
    user = await User.findById(req.user._id);
    if (user.subscribes.includes(sourceID)) return res.send({ status: "error", message: "source already added" });

    await User.findByIdAndUpdate(req.user._id, { $push: { subscribes: [sourceID] } }, { new: true })

    return res.send({ status: "done" })
})

sourceRouter.delete('/', async (req, res) => {
    const { sourceID } = req.body;
    if (!sourceID) return res.status(400).send('no source id');

    try {
        await User.findByIdAndUpdate(req.user._id, { $pullAll: { subscribes: [sourceID] } }, { new: true })
        return res.send({ status: "done" })
    } catch (error) {
        return res.send({ status: "error", message: "source is not deleted" })
    }
})


module.exports = sourceRouter