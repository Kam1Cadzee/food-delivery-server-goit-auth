const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
  sku: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  categories: [String],
  likes: Number,
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredient"
    }
  ]

}, { versionKey: false });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;