const dotenv = require('dotenv');
// dotenv.config({ path: './.env.development' });
dotenv.config();
const dartController = require('./controllers/dartController');
const port = process.env.PORT || '3000';
const host = process.env.HOST || '127.0.0.1';

const { log } = require('./logger');
const util = require('util');
log.info(`start node [${process.version}] `);

//create a http server
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

/// Socket Io stuff - share express http server
log.info(`socket io --start`);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: `http://${process.env.HOST}:${process.env.PORT}`,
    methods: ["GET", "POST"]
  }
});

//save to locals
app.locals.io = io;

//connect to sockets
io.on('connection', socket => {
  log.info(`[socket.io -- connection [${socket.id}]`);
  app.locals.socket = socket; //store for later use
  
  //client dartboard change
  socket.on('received darts', async (darts) => {
    log.dart(`socket.io -- received darts [${util.inspect(darts)}]`);
    await dartController.updateDarts(darts);
  });
});

io.engine.on("connection_error", (err) => {
  log.error(`socket.io -- req[${err.req}]; code[${err.code}]; msg[${err.message}]; context[${err.context}];`);
});

//http server for socket io + express
server.listen(port, host, () => {
  const msg = `hmm [express, socket io] listening ${host}:${port}...`;
  console.log(msg);
  log.info(msg);
});


//exception handlers...
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down(see error.log)...');
  log.error(`name [${err.name}], message[${err.message}], stack[${err.stack}]`);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down(see error.log)...');
  log.error(`name [${err.name}], message[${err.message}], stack[${err.stack}]`);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', err => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully(see error.log)...');
  log.error(`name [${err.name}], message[${err.message}], stack[${err.stack}]`);
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});


