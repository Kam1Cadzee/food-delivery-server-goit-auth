const Comment = require("../../db/model/comment");
const express = require("express");

const commentsRouter = () => {
  const commentRouter = express.Router();
  commentRouter.get("/", (request, response) => {
    const { productId } = request.query;

    Comment.find(
      { product: productId },
      { product: false, _id: false },
      (err, comments) => {
        if (err) {
          response.send({
            status: "failed"
          });
          return;
        }
        response.send({
          status: "success",
          comments
        });
      }
    );
  });
  commentRouter.post("/", (request, response) => {
    const comment = request.body;

    Comment.create(comment, (err, com) => {
      if (err) {
        response.send({
          status: false,
          message: "Can't create new comment"
        });
        return;
      }
      response.send({
        status: true,
        id: com._id
      });
    });
  });
  return commentRouter;
};

module.exports = commentsRouter;
