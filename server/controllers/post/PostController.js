const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post");

const createPost = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (!req.body.title || !req.body.content) {
    res.status(500);
    throw new Error("Please fill out all the required fields");
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    if (savedPost) {
      res.status(201).json(savedPost);
    } else {
      res.status(501).json("Could not Post");
    }
  } catch (error) {
    res.status(501);
    throw new Error(error);
  }
});

module.exports = {
  createPost,
};
