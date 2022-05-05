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

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(cors({
  origin: [
    'localhost:3000',
    'http://localhost:3000',
  ],
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders: 'Content-Type, Authorization, Origin, Accept',
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(middlewareError);

app.listen(PORT, () => { console.log(`Listening to port: ${PORT}`); });
