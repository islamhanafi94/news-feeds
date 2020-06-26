const express = require('express');

require('dotenv-safe').config();
const config = require('config');

const app = express();

require('./startup/config')();
require('./startup/morgan')(app);
require('./startup/cors')(app);
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/production');

app.listen(config.get('port'), () => {
    console.log('Server is Running on port', config.get('port'));
})


