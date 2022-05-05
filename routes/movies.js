const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const {
  getSavedMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(
      (value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Введена некорректная ссылка.');
        }
        return value;
      },
    ).required(),
    trailer: Joi.string().custom(
      (value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Введена некорректная ссылка.');
        }
        return value;
      },
    ).required(),
    thumbnail: Joi.string().custom(
      (value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Введена некорректная ссылка.');
        }
        return value;
      },
    ).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), removeMovie);

module.exports = router;
