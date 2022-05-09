const router = require('express').Router();
const { createUser, login, signout } = require('../controllers/users');
const { validateSignUp, validateSignIn } = require('../middlewares/validator');

router.post('/signup', validateSignUp, createUser);

router.post('/signin', validateSignIn, login);

router.post('/signout', signout);

module.exports = router;
