const express = require("express");
const { createPost } = require("../../controllers/post/PostController");
const { verifyToken } = require("../../utils/verifyToken");
const postRouter = express.Router();

postRouter.post('/create-post', verifyToken, createPost);

module.exports = postRouter;
