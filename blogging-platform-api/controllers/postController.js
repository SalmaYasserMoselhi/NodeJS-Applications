const AppError = require('../utils/appError');
const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');

const getAllPosts = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const term = req.query.term;
  console.log(term);

  let filterObject = {};

  if (term) {
    filterObject = {
      $or: [
        // $regex Provides regular expression capabilities for pattern matching strings in queries.
        { title: { $regex: term, $options: 'i' } }, // i for case insensitive
        { content: { $regex: term, $options: 'i' } },
        { category: { $regex: term, $options: 'i' } },
      ],
    };
  }

  const posts = await Post.find(filterObject);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  req.body.updatedAt = Date.now();

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Validate the updated document
  });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(201).json({
    status: 'success',
    data: {
      post,
    },
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  // SEND RESPONSE
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
