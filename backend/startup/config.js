const config = require('config');
module.exports = function (app) {

    if (!config.get('jwt_secret')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}