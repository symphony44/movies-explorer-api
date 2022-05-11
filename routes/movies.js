const router = require('express').Router();

const {
  validatePostMovie,
  validateRemoveMovie,
} = require('../middlewares/validator');
const {
  getSavedMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', validatePostMovie, createMovie);
router.delete('/:movieId', validateRemoveMovie, removeMovie);

module.exports = router;
