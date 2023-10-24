const { Router } = require('express')

const router = Router();

const StoreImage = require('./util/StoreImage')

const thumbEdit = require('../controllers/Account/thumbEdit')

router.post('/thumb', StoreImage("./public/user").single("thumb"), thumbEdit);

module.exports = router;