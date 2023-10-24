
const Login = (req, res, next) => {
  const user = {
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      username: req.user.username,
      thumb: `${process.env.SERVER_LINK}/public/user/${req.user.thumb}`,
      email: req.user.email,
      mobile: req.user.mobile,
      accountType: req.user.accountType,
      role: req.user.role,
      field: req.user.field,
      points: req.user.points
  }
  res.status(200).json(user);
}

module.exports.Login = Login;