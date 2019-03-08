const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = Schema(
  {
    username: String,
    telephone: String,
    email: String,
    password: {
      type: String,
      require: true,
      select: false
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    viewedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
