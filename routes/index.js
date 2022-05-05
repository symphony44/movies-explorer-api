const express = require('express');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const userRoute = require('./users');
const movieRoute = require('./movies');
const authRoute = require('./auth');

const router = express.Router();

router.use('/', authRoute);
router.use(auth);
router.use('/users', userRoute);
router.use('/movies', movieRoute);

router.use('*', () => {
  throw new NotFoundError('Маршрут не найден.');
});

module.exports = router;
