const express = require('express');


const app = express();

require('dotenv-safe').config();
require('./startup/cors')(app);
require('./startup/db')();
require('./startup/routes')(app);


app.listen(process.env.PORT, () => {
    console.log('Server is Running on port', process.env.PORT);
})


