const express = require('express');

const app = express();

if (app.get('env') === 'development') {
    require('dotenv-safe').config();
}

require('./startup/config')(app);
require('./startup/morgan')(app);
require('./startup/cors')(app);
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/production')(app);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is Running on port', port);
})


