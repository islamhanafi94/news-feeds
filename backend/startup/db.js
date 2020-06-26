const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    const DB_URL = config.get('db-url');
    mongoose.connect(DB_URL,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("DB connected Successfuly"))
        .catch((err) => console.log(err));
}