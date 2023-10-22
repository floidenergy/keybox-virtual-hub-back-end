const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "userModels",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "userModels",
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', comment)