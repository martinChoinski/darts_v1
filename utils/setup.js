const fs = require('fs')
const path = require('path')


//add various app wide settings to the app object
exports.setup = app => {
  
  ///use these funcs as work around per flash session dependancy
  app.pushAlert = (type, msg) => {
    !app.alerts && (app.alerts = []);
    // console.log(`pushAlert = type[${type}] msg[${msg}]`);
    app.alerts.push({type, msg});
  }
    //fifo alerts returned as an array
  app.popAlerts = () => {
    const alerts = [];
    while(app.alerts && app.alerts.length > 0) {
        alerts.push(app.alerts.shift());
      }
      // console.dir(alerts);
      return alerts;
  }

  app.throwMsg = (t, m, v) => {
    let score;
    if (m == 0 || v == 0) {
      score = 'no dart value'
    } else if (v == 50) {
      score = 'bullseye - 50'
    } else if (v == 25) {
      score = 'outer bullseye - 25'
    } else {
      score = `${['single','double','triple'][m-1]} ${v}`;
    }
  
    const msg = [
      `1st Throw: ${score};`,
      `2nd Throw: ${score};`,
      `Last Throw: ${score};` 
    ];
  
    return msg[t-1];
  }

  
  //set any null fields to empty strings
  app.removeNulls = model => {
    if(!model)  return;

    const fields  = Object.getOwnPropertyNames(model.dataValues);
    for(const f of fields) {
        // console.log(`asset[${f}] = ${asset[f]}`);
        if(model[f] === null) {
            model[f] = '';
        }
    }
  }

  //delay t msecs
  app.delay = (t, val) => {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
  }

  //help with queueing
  app.locals.locks = []; 
  app.locals.locks.push({ name:'playKiller', state : false, seq : 0, semaphore : [] });
  app.locals.locks.push({ name:'dartThrow', state : false, seq : 0, semaphore : [] });
  app.locals.locks.push({ name:'backoutThrow', state : false, seq : 0, semaphore : [] });

  //define to make ejs happy and set initially to logged
  app.locals.user = undefined;

  //initial creation used to enqueue some processing
  app.locals.isProcessingGame = false;
}


