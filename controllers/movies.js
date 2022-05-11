const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { ...data } = req.body;

  Movie.find({ owner: req.user._id, movieId: data.movieId })
    .then((movies) => {
      if (movies.length >= 1) {
        throw new ConflictError('Такой фильм уже добавлен.');
      }
      Movie.create({
        ...data,
        owner: req.user._id,
      })
        .then((movie) => res.status(201).send(movie))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некоректные данные.');
          }
        });
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма нет.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нелья удалить чужой фильм.');
      }
      return movie.remove()
        .then((removedMovie) => res.send({ data: removedMovie }));
    })
    .catch(next);
};
