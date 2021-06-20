
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, ms, printf } = format;

//use a default format
const logFormat = printf(({ level, message, timestamp, ms }) => {
  return `[${level}]: ${timestamp}: ${message}; (${ms})`;
});


//filter everything bar these 'levels' (ie levels is an array)
const filter = levels => format((info) => {
  if (levels.includes(info.level)) {
    return info;
  }
})();

const logger = createLogger({
  levels: { 
    error: 0, 
    warn: 1, 
    http: 2,  //morgan
    dart: 3,  //specific dart communication
    db: 4,    //database / sequelize logs
    info: 5,  //filter as desired
    debug: 6  //filter as desired
  },
  level: 'info',
  format:  combine(timestamp(), ms(), logFormat),
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/warn.log', level: 'warn' }),
    new transports.File({ filename: './logs/http.log', level: 'http', format: filter(['http']) }),
    new transports.File({ filename: './logs/dart.log', level: 'dart', format: filter(['dart']) }),
    new transports.File({ filename: './logs/db.log', level: 'db', format: filter(['db']) }),
    new transports.File({ filename: './logs/info.log', level: 'info', format: filter(['info','warn','error']) }),
    new transports.File({ filename: './logs/debug.log', level: 'debug', format: filter(['debug','warn','error']) }),
    new transports.File({ filename: './logs/combined.log',  format: combine( timestamp(), ms(), format.json()) }),
  ],
});
exports.logger = logger;

trace = (n=3) => {
  const stack = new Error().stack.split('\n')[n].split('/');
  const last = stack[stack.length -1];
  return last.trimEnd(')');
}

const log = {};
log.error = msg => logger.error(`[${trace()}]; ${msg}`);
log.warn = msg => logger.warn(`[${trace()}]; ${msg}`);
log.http = msg => logger.http(`[${trace()}]; ${msg}`);
log.dart = msg => logger.dart(`[${trace()}]; ${msg}`);
log.db = msg => logger.db(`[${trace()}]; ${msg}`);
log.info = msg => logger.info(`[${trace()}]; ${msg}`);
log.debug = msg => logger.debug(`[${trace()}]; ${msg}`);

exports.log = log;
