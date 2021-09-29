const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.Encode = (data) => {
    return jwt.sign(data, jwtConfig.secretKey);
};

exports.Decode = (token) => {
    return jwt.verify(token, jwtConfig.secretKey);
};

const createJWTToken = (payload) => {
	return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: "24h" });
};

module.exports = {
    createJWTToken
}