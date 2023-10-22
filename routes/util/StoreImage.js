const multer = require('multer');
const path = require('path')
const fs = require('fs')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// })

// module.exports = multer({ storage })

const storage = (path) => multer(multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
}))

module.exports = storage