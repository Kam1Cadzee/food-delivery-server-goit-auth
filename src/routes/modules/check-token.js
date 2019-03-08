const app = require("./../../app");
const jwt = require("jsonwebtoken");

const getToken = req => req.body.token || req.query.token || req.headers['x-access-token'];

const checkToken = (req, res, next) => {
  const url = req.url;
  if(url === "/auth/login" || url === "/auth/register") {
    next();
    return;
  }

  const token = getToken(req);
  const secretKey = app.get('secret');

  if(!token) {
    return res.status(403).send({
      success: false,
      message: 'No toekn provided.'
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
    req.decoded = decoded;
    next();
  })
}

module.exports = checkToken;