const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../../db/model/user");
const app = require("./../../app");
const express = require("express");

const errorResp = {
  success: false,
  message: "Authentication failed"
};

const passMatches = (pass, hash) => bcrypt.compareSync(pass, hash);

const generateToken = params => {
  const secretKey = app.get("secret");
  return jwt.sign(params, secretKey, {
    expiresIn: 60 * 60 * 24
  });
};

const authRouter = () => {
  const router = express.Router();

  router.post("/register", function(request, response) {
    let data = request.body;
    User.findOne({ email: data.email}, (err, user) => {
      if(user) {
        response.send({
          success: false,
          message: "Пользователь с таким email уже есть."
        });
        return;
      }
      data = { ...data, password: bcrypt.hashSync(data.password, 10) };
      User.create(data, (err, user) => {
        if (err) throw err;
        response.send({ status: "success", user: { ...data, _id: user._id } });
      });
    })
    
  });

  router.post("/login", (request, response) => {
    const { email, password } = request.body;

    User.findOne({ email })
      .select("password")
      .exec((err, user) => {
        if (err) {
          response.send({
            success: false,
            message: "User didn't find"
          });
        }
        

        const correctPassword = passMatches(password, user.password);

        if (!user || !correctPassword) {
          response.json(errorResp);
          return;
        }
        const payload = {
          password,
          email
        };

        const token = generateToken(payload);
        response.json({
          success: true,
          message: "Enjoy your token!",
          token: token
        });
      });
  });
  router.get("/logout", (request, response) => {
    response.send("ok");
  });
  router.get("/current", (request, response) => {
    const { email } = request.decoded;
    User.findOne({ email }, (err, user) => {
      if (err) {
        response.send({
          success: false,
          message: "User didn't find."
        });
      }
      response.send(user);
    });
  });
  return router;
};

module.exports = authRouter;
