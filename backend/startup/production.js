const helmet = require('helmet');
const compression = require('compression');

module.exports = function (app) {
    if (app.get('env') !== 'development') {
        app.use(helmet());
        app.use(compression());
    }
}

