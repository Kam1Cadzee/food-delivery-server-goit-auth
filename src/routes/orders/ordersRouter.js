const Product = require("../../db/model/product");
const User = require("../../db/model/user");
const Order = require("../../db/model/order");
const express = require('express');

const ordersRouter = () => {
  const ordersRouter = express.Router();
 
  ordersRouter.post("/", (request, response) => {
    let data = request.body;
    const creatorId = data.creator;
    const productIds = data.productsList.map(product => product.product);

    Product.find({
      _id: { $in: [...productIds] }
    })
      .then(() => {
        User.findById(creatorId)
          .then(user => {
            Order.create(data, (err, order) => {
              if (err) response.send("Failed");
              else {
                user.orders = [...user.orders, order._id];
                user.save();
                response.send({ status: "success", id: order._id });
              }
            });
          })
          .catch(() => {
            response.send("User didn't find");
          });
      })
      .catch(err => {
        console.log(err);
        response.send(`Product(${err.value}) didn't find`);
      });
  });
  ordersRouter.get("/:id", (request, response) => {
    const id = request.params["id"];
    Order.findById(id, (err, order) => {
      if (err) {
        response.send({ status: `failed for value ${id}` });
      } else {
        response.send(order);
      }
    });
  });
  return ordersRouter;
};
module.exports = ordersRouter;
