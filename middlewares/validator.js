const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(16).required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validatePostMovie = celebrate({
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
    trailerLink: Joi.string().custom(
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
});

module.exports.validateRemoveMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
