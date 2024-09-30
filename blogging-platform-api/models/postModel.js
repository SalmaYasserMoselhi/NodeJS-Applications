const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    unique: [true, 'A post with this title already exists'],
    minLength: [3, 'A post title must have at least 3 characters'],
    maxLength: [50, 'A post title must have at most 50 characters'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'A post must have some content'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'A post must have a category'],
    trim: true,
  },
  tags: {
    type: [String],
    validate: [
      function (val) {
        return val.length > 0;
      },
      'A post must have at least one tag',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// QUERY MIDDLEWARE (Hook)
postSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() }); // this refers to the query object
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
