require('dotenv').config()

const { Router } = require("express");
const passport = require("passport");
const cors = require('cors')

const AuthRouter = Router();

const { Login } = require('../controllers/UserAccount/login')
const { Register } = require('../controllers/UserAccount/register');
const { Logout } = require('../controllers/UserAccount/logout');


AuthRouter.post("/login", passport.authenticate('local', {
    successMessage: "you have been succesfully connected",
    failureMessage: true
}), Login)

AuthRouter.route('/register')
    .post(Register)

AuthRouter.route('/logout')
    .get(Logout)

module.exports = AuthRouter;