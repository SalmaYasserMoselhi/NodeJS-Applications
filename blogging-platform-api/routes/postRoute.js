const express = require('express');
const postController = require('./../controllers/postController');

const router = express.Router(); // Creates a new router object, which is a mini-app that can be used as a middleware

// For each route, we can use the router object to define the route and the corresponding controller function to handle
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);
router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
