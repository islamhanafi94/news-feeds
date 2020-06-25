const mongoose = require('mongoose');


module.exports = () => {
    const DB_URL = process.env.DB_URL;
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