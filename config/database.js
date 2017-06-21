const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/8-test',
    secret: crypto,
    db: '8-test'
}