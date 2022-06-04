require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const middlewareError = require('./middlewares/error');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const app = express();

const { PORT = 3000, NODE_ENV, DATA_BASE } = process.env;

mongoose.connect(`${NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/moviesdb'}`, {
  useNewUrlParser: true,
});

app.use(cors({
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'http://symphony44diplomaweb.nomoredomains.xyz',
    'https://symphony44diplomaweb.nomoredomains.xyz',
    'http://localhost:3050',
    'localhost:3050',
  ],
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization, Origin, Accept',
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(helmet());
app.use(limiter);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(middlewareError);

app.listen(PORT, () => { console.log(`Listening to port: ${PORT}`); });
