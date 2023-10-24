const Post = require('../../model/postModel')

const getForum = async (req, res, next) => {

    let posts = await Post.find().populate('owner');

    posts = posts.map(post => {
      const ownerObject = post.owner.toObject();

      delete ownerObject.hash
      delete ownerObject.salt
      delete ownerObject.status
      delete ownerObject.email
      delete ownerObject.mobile
      delete ownerObject.points
      delete ownerObject.status

      ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`

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

          ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`
          comment.owner = ownerObject;

          return comment;
        })

      }
      return post;
    }));


    res.status(200).json(posts);

}

const getForumById = async (req, res, next) => {

    const post = await Post.findById(req.params.id).populate(['owner']);

    if (!post)
      return res.status(204).json({ message: 'No Post Found' });

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
}

const getForumByUser = async (req, res, next) => {
    const userID = req.params.id
    let posts = await Post.find({ owner: userID }).populate(['owner']);
  
    
    posts.forEach(post => {
      const ownerObject = post.owner.toObject();

      delete ownerObject.hash
      delete ownerObject.salt
      delete ownerObject.status
      delete ownerObject.email
      delete ownerObject.mobile
      delete ownerObject.points
      delete ownerObject.status

      ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`

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

        post.comments.forEach(async comment => {

          const ownerObject = comment.owner.toObject();
          delete ownerObject.hash
          delete ownerObject.salt
          delete ownerObject.status
          delete ownerObject.email
          delete ownerObject.mobile
          delete ownerObject.points
          delete ownerObject.status

          ownerObject.thumb = `${process.env.SERVER_LINK}/public/user/${ownerObject.thumb}`
          comment.owner = ownerObject;

          return comment;
        })

      }
      
      return post;
    }));
    

    return res.status(200).json(posts);

}




module.exports.getForum = getForum
module.exports.getForumById = getForumById
module.exports.getForumByUser = getForumByUser