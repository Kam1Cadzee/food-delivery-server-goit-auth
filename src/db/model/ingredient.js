const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = Schema({
  name: String,
  description: String
}, { versionKey: false});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;