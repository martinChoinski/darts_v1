const path = require('path');
const express = require('express');
const morgan = require('morgan');
const {log} = require('./logger');
const cors = require('cors');

const { setup } = require('./utils/setup');   //app wide util funcs

const dartRouter = require('./routes/dartRoutes');
const viewRouter = require('./routes/viewRoutes');

// Start express app
log.info(`starting app in [${process.env.NODE_ENV}] mode...`)
const app = express();

//security
app.use(cors());

// app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

const morganMiddleware = morgan("short", {
  // specify a function for skipping requests without errors
  skip: (req, res) => res.statusCode < 200,
  // specify a stream for requests logging
  stream: {
    write: (msg) => log.http(msg)
  }
});

app.use(morganMiddleware);

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//// security
// app.use(helmet());
// app.use(cors());

// set some custom app wide utils
setup(app);

// express setup
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


//// ROUTES
app.use('/darts.json', dartRouter);
app.use('/', viewRouter);

app.all('*', (req, res) => {
  const msg = `No route for ${req.originalUrl}`;
  log.info(msg);
  res.status(404).send(msg);
});

module.exports = app;