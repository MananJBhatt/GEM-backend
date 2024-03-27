const JWT = require('jsonwebtoken');
const secret = "m@n@n@347";

function createUserToken(user) {

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    const token = JWT.sign(payload, secret);
    console.log(token);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports = {  createUserToken,validateToken };
