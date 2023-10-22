const Logout = (req, res, next) => {
    req.logout(err => console.log(err));
    res.sendStatus(200);
}

module.exports.Logout = Logout;