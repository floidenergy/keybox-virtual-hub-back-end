const fs = require('fs')

module.exports = async (req, res, next) => {

    if (!req.user) {
        fs.unlink(req.file.path, err => {
          if (err)
            console.error('error deleting file: ', err)
          else
            console.log('file deleted successfully')
        });
        return res.sendStatus(511);
      }
    
      if (req.user.thumb) {
        fs.unlink(`public/${req.user.thumb}`, err => {
          if (err)
            console.error('error deleting file: ', err)
          else
            console.log('file deleted successfully')
        });
      }
    
      req.user.thumb = req.file.filename
    
      const result = await req.user.save();
    
      if(!result)
        next({message: 'couldnt upload picture'});
    
      const user = {
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        username: req.user.username,
        thumb: `${process.env.SERVER_LINK}/${req.user.thumb}`,
        email: req.user.email,
        mobile: req.user.mobile,
        accountType: req.user.accountType,
        role: req.user.role,
        field: req.user.field,
        points: req.user.points
      }
      res.status(200).json(user)
}