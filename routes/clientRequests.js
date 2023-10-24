require('dotenv').config();

const {
  CreatePost,
  CreateComment,
  DeletePost,
  DeleteComment,
  LikeUnlikePostComment
} = require('../controllers/client/forum')

const TryCatch = require('../utils/TryCatch')

const { Router } = require('express');


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
  .post(TryCatch(CreatePost))

// post a forum comment
ClientRouter.route('/forum/comment/:id')
  .post(TryCatch(CreateComment))

ClientRouter.route("/forum/:id")
  // delete a forum post
  .delete(TryCatch(DeletePost));

// like or unlike a comment or a post
ClientRouter.route('/forum/likes/:type/:id')
  .put(TryCatch(LikeUnlikePostComment))

// delete a forum comment
ClientRouter.route('/forum/comment/:PostID/:commentId')
  .delete(TryCatch(DeleteComment))

module.exports = ClientRouter;