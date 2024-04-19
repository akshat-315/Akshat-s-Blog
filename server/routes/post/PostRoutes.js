const express = require("express");
const {
  createPost,
  getPosts,
} = require("../../controllers/post/PostController");
const { verifyToken } = require("../../utils/verifyToken");
const postRouter = express.Router();

postRouter.post("/create-post", verifyToken, createPost);
postRouter.get("/get-posts", getPosts);

module.exports = postRouter;
