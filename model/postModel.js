const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "UserModels",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "UserModels",
    required: false
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    ref: "Comment",
    required: false
  },
  tags: {
    type: [String],
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', Post);