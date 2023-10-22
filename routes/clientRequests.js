require('dotenv').config();

const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

const { Router } = require('express');
const StoreImage = require('./util/StoreImage')

// routes in "/client"
const ClientRouter = Router();

// check if the session is valid
ClientRouter.use((req, res, next) => {
  if (req.user)
    next();
  else
    res.status(511).json({ message: "no session found" });
})

// post a forum Post
ClientRouter.route('/forum')
  .post(async (req, res) => {
    const { title, content } = req.body

    const post = new Post({
      owner: req.user._id,
      title,
      content,
    })

    const result = await post.save();

    console.log(result);
    res.status(200).json({ message: "forum post created" });
  })

// post a forum comment
ClientRouter.route('/forum/comment/:id')
  .post(async (req, res) => {
    const postID = req.params.id
    const { content } = req.body

    const comment = new Comment({
      owner: req.user._id,
      content
    })

    const commentResult = await comment.save();

    console.log(commentResult);
    await Post.findByIdAndUpdate(postID, { $push: { comments: comment._id } })

    res.status(200).json({ message: "forum comment created" });
  })

ClientRouter.route("/forum/:id")
  // like or unlike a forum
  .put(async (req, res) => {


    const postID = req.params.id
    const post = await Post.findById(postID)
    if (!post)
      return res.status(404).json({ message: "post not found" })

    // check if it's already liked or nah
    const like = post.likes.find(like => like.toString() === req.user._id.toString())
    if (like) {
      await Post.findByIdAndUpdate(postID, { $pull: { likes: req.user._id } })
      return res.status(200).json({ message: "post unliked" })
    } else {
      await Post.findByIdAndUpdate(postID, { $push: { likes: req.user._id } })
      return res.status(200).json({ message: "post liked" })
    }
  })
  // delete a forum post
  .delete(async (req, res) => {
    const postID = req.params.id
    const post = await Post.findById(postID)
    if (!post)
      return res.status(404).json({ message: "post not found" })
    // check if the user is the author of this post
    if (post.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "you are not the author of this post" })

    await Post.findByIdAndDelete(postID)
    res.send("Post deleted successfully");
  });


// like or unlike a comment
ClientRouter.route('/forum/comment/:commentId')
  .put(async (req, res) => {
    const commentID = req.params.commentId
    const comment = await Comment.findById(commentID)
    if (!comment)
      return res.status(404).json({ message: "comment not found" })

    // check if it's already liked or nah
    const like = comment.likes.find(like => like.toString() === req.user._id.toString())
    if (like) {
      await Comment.findByIdAndUpdate(commentID, { $pull: { likes: req.user._id } })
      return res.status(200).json({ message: "comment unliked" })
    } else {
      await Comment.findByIdAndUpdate(commentID, { $push: { likes: req.user._id } })
      return res.status(200).json({ message: "comment liked" })
    }
  })
// delete a forum comment
ClientRouter.route('/forum/comment/:id/:commentId')
  .delete(async (req, res) => {
    const postID = req.params.id
    const commentID = req.params.commentId

    const post = await Post.findById(postID).populate('owner')
    const comment = await Comment.findById(commentID).populate({
      path: 'owner',
      model: 'UserModels'
    })

    if (!post || !comment)
      return res.status(404).json({ message: "post or comment not found" })

    // check if the user is the author of this post or the commenter
    if (!(post.owner._id.toString() === req.user._id.toString() || comment.owner._id.toString() === req.user._id.toString()))
      return res.status(403).json({ message: "you are not the author of this post or the commenter" })


    // console.log(postID, commentID);
    await Post.findByIdAndUpdate(postID, { $pull: { comments: commentID } })
    await comment.deleteOne();

    res.status(200).json({ message: "forum comment deleted" });
  })

module.exports = ClientRouter;