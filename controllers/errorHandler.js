module.exports = (err, req, res, next) => {

  console.log(err);

  if(err.code === 11000)
    return res.status(406).json({message: "username already exist"})

  return res.status(err.code || 500).json(err.message)
}