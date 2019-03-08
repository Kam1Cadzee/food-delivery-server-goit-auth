const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  productsList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      type: {
        type: String,
        enum: ["M", "XL", "XXL"]
      },
      itemsCount: Number
    }
  ],
  deliveryType: {
    type: String,
    enum: ["delivery", "office"]
  },
  deliveryAdress: String,
  sumToPay: Number,
  status: {
    type: String,
    enum: ["inProgress", "declined", "finished", "failed"]
  }
}, { versionKey: false });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
