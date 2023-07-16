const jwt = require('jsonwebtoken');
const RefreshTokenSchema = require('../models/token');

const ACCESS_SECRECT_TOKEN = "6395c727999e60eeb0c503b6ff3be4fd0ba6808bd0baf1f98bac27d42ffe4b0b55aa310709d205046c6138da7e916b251ef07579166d28a4298363989d24e2f5";
const REFRESH_SECRECT_TOKEN = "c0cfb94895476ffdb57e0f3903b122b441696df64ec36fd3c6195f4f3f2fa982c258b43c9d22e1ad14a2b9aed304033c650642c9d4b438ba8a4a2310a0091ccb";


class JWTService {

    static signAccessToken(payload, expiryTime) {
        return jwt.sign(payload, ACCESS_SECRECT_TOKEN, {expiresIn : expiryTime});
    }
    static signRefreshToken(payload, expiryTime) {
        return jwt.sign(payload, REFRESH_SECRECT_TOKEN, {expiresIn: expiryTime});
    }
    static verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_SECRECT_TOKEN);
    }
    static verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_SECRECT_TOKEN);
    }
    static async storeRefreshToken(token, userId) {
        try {
            const newToken = new RefreshTokenSchema({
                token: token,
                userId: userId
            })
            await newToken.save();
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = JWTService;