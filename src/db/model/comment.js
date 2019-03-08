const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  mark: Number
}, {versionKey: false});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;