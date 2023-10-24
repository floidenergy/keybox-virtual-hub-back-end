const Post = require('../../model/postModel')
const Comment = require('../../model/commentModel')

const CreatePost = async (req, res) => {
  const { title, content } = req.body

  const post = new Post({
    owner: req.user._id,
    title,
    content,
  })

  await post.save();

  return res.status(200).json({ message: "forum post created" });
}

const CreateComment = async (req, res) => {
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
}

const DeletePost = async (req, res) => {
  const postID = req.params.id
  const post = await Post.findById(postID)
  if (!post)
    return res.status(404).json({ message: "post not found" })
  // check if the user is the author of this post
  if (post.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "you are not the author of this post" })

  await Post.findByIdAndDelete(postID)
  res.send("Post deleted successfully");
}

const LikeUnlikePostComment = async (req, res) => {
  const type = req.params.type
  const id = req.params.id
  const user = req.user

  if (type === 'comment') {
    const comment = await Comment.findById(id)
    if (!comment)
      return res.status(404).json({ message: "comment not found" })

    // check if it's already liked or nah
    const like = comment.likes.find(like => like.toString() === user._id.toString())
    if (like) {
      await Comment.findByIdAndUpdate(id, { $pull: { likes: user._id } })
      return res.status(200).json({ message: "comment unliked" })
    } else {
      await Comment.findByIdAndUpdate(id, { $push: { likes: user._id } })
      return res.status(200).json({ message: "comment liked" })
    }
  } else if (type === 'post') {
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
  } else {
    return res.sendStatus(404);
  }
}

const DeleteComment = async (req, res) => {
  const postID = req.params.PostID
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
}

// TODO: ADD POST STATUS
// TODO: CLOSE A POST

module.exports = { CreatePost, CreateComment, DeletePost, LikeUnlikePostComment, DeleteComment }