const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const creatureController = require('./controllers/creatureController');


router.use(homeController);
router.use(userController);
router.use(creatureController);

module.exports = router;