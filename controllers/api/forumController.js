const Post = require('../../model/postModel')

const getForum = async (req, res, next) => {
  try {
    const EditedUser = []

    let posts = await Post.find().populate('owner');


    posts = await Promise.all(posts.map(async (post) => {
      if (post.likes.length > 0) {
        await post.populate('likes');
      }
      return post
    }))

    posts = posts.map(post => {
      const ownerObject = post.owner.toObject();

      delete ownerObject.hash
      delete ownerObject.salt
      delete ownerObject.status
      delete ownerObject.email
      delete ownerObject.mobile
      delete ownerObject.points
      delete ownerObject.status


      // if (!EditedUser.find(userID => userID === ownerObject._id.toString())) {
      ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`
      // EditedUser.push(ownerObject._id.toString());
      // }

      post.owner = ownerObject;

      return post
    })


    posts = await Promise.all(posts.map(async (post) => {
      if (post.comments.length > 0) {

        await post.populate({
          path: 'comments',
          populate: {
            path: 'owner',
            model: 'UserModels'
          }
        });

        post.comments = post.comments.map(async comment => {

          const ownerObject = comment.owner.toObject();
          delete ownerObject.hash
          delete ownerObject.salt
          delete ownerObject.status
          delete ownerObject.email
          delete ownerObject.mobile
          delete ownerObject.points
          delete ownerObject.status


          // if (!EditedUser.find(userID => userID === ownerObject._id.toString())) {
          ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`
          // EditedUser.push(ownerObject._id.toString());
          // }
          comment.owner = ownerObject;

          return comment;
        })

      }
      return post;
    }));


    res.status(200).json(posts);
  } catch (error) {
    next(error)
  }
}

const getForumById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(['owner']);

    // if (!post)
    //   return res.status(200).json(post);


    if (post.likes.length > 0) {
      await post.populate('likes');
    }

    if (post.comments.length > 0) {

      await post.populate('comments');


      await post.populate({
        path: 'comments',
        populate: {
          path: "owner",
          model: "UserModels"
        }
      })

      post.comments.forEach(comment => {

        const ownerObject = comment.owner.toObject();
        delete ownerObject.hash
        delete ownerObject.salt
        delete ownerObject.status
        delete ownerObject.email
        delete ownerObject.mobile
        delete ownerObject.points
        delete ownerObject.status

        ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${post.owner.thumb}`
        comment.owner = ownerObject;

        return comment;
      })
    }

    const ownerObject = post.owner.toObject();
    delete ownerObject.hash
    delete ownerObject.salt
    delete ownerObject.status
    delete ownerObject.email
    delete ownerObject.mobile
    delete ownerObject.points
    delete ownerObject.status
    ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${post.owner.thumb}`
    post.owner = ownerObject;

    return res.status(200).json(post)

  } catch (error) {
    next(error)
  }
}

const getForumByUser = async (req, res, next) => {
  try {
    const post = await Post.findOne({ owner: req.params.id }).populate(['owner']);

    if (post.comments.length > 0)
      await post.populate('comments')

    if (post.likes.length > 0)
      await post.populate('likes')


    if (post)
      return res.status(200).json(post);

    return res.status(404)

  } catch (error) {
    next(error)
  }
}




module.exports.getForum = getForum
module.exports.getForumById = getForumById
module.exports.getForumByUser = getForumByUser