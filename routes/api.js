const { Router } = require('express')
const Getters = require('./api/v1/Getters');

const router = Router();

router.route("/")
  .get((req, res) => {
    res.status(200).send("Welcome to keybox api 📖❤️");
  })

router.use("/", Getters)

module.exports = router;