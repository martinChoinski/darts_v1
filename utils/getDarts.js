const axios = require('axios');
const util = require('util');
const { log } = require('../logger');


//remove any equality conditions; = equal coordinates
//sort by timestamp and
const comp = (a, b) => {
  //apply tolerance if timestamp is equal between throws
  const coordsTolerance = 10;
  return (
    a.coOrds.x === b.coOrds.x && a.coOrds.y === b.coOrds.y ? 0 :
    parseInt(a.timestamp) < parseInt(b.timestamp) ? -1 : 
    parseInt(a.timestamp) > parseInt(b.timestamp) ? 1  :
    Math.abs(a.coOrds.x - b.coOrds.x) <= coordsTolerance && Math.abs(a.coOrds.y - b.coOrds.y) <= coordsTolerance ? 0 :
    a.index  < b.index ? -1 :
    a.index  > b.index ? 1 : 0
  );
};

const to_coord = (value, mult) => {
  //dart board sequence clockwise starting at 20 where midpoint = PI / 2 radians
  //const nums = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  //index position of dart board number array - starting from from 20 -- see above 
  const iNum = [1, 8, 10, 3, 19, 5, 12, 14, 17, 6, 15, 18, 4, 16, 7, 13, 9, 2, 11, 0]
  //return mid degrees of sector (ie 20 = 90%);
  const toRadians = n => ( (5 - iNum[n-1])  *  Math.PI / 10 );
  
  //radius of board in mm - use mid points
  const board = [0, 451 / 2];
  const inner_bull = [0, 12.7 / 2];
  const outer_bull = [12.7 / 2, 31.8 / 2];
  const treble = [99, 107];
  const double = [162, 170];
  const miss_in_board = [170, 451 /2];    
  const single = [ [31.8 /2, 107],  [115, 162] ];

  let radians, radius;        
  if(value === 50) {
      radians  = Math.random() * Math.PI * 2;
      radius = (inner_bull[0] + inner_bull[1]) / 2; 
  } else  if(value === 25) {
      radians  = Math.random() * Math.PI * 2;
      radius = (outer_bull[0] + outer_bull[1]) / 2; 
  } else if(value === 0 || mult == 0) {
      radians  = Math.random() * Math.PI * 2;
      radius = (miss_in_board[0] + miss_in_board[1]) / 2; 
  } else if (value >= 1 && value <= 20 && mult >= 1 && mult <= 3) {
      radians = toRadians(value); //use bi-sector
      if(mult === 3) {
          radius = (treble[0] + treble[1]) / 2; 
      } else if(mult === 2) {
          radius = (double[0] + double[1]) / 2; 
      } else if(mult === 1) {
          const iRegion = Math.floor(Math.random() * 2);
          radius = (single[iRegion][0] + single[iRegion][1]) / 2; 
      }
  }
  return [radius * Math.cos(radians), radius * Math.sin(radians), radians, radius];
}
exports.toCoord = to_coord;

const randomDart = (biasValues, biasMultipliers)=> {
  let mult = 1;
  mult += Boolean(Math.random() < .2);
  mult += Boolean(Math.random() < .1);  
  
  let value = Math.floor(Math.random()*23);
  value = value === 21 ? mult === 1 ? 25 : 0 : value; 
  value = value === 22 ? mult === 1 ? 50 : 0 : value; 

  //give retries to killers who have their own home hits
  if(biasValues) {
    let i = Math.floor(Math.random()*biasValues.length);
    value = biasValues[i];
  }
  if(biasMultipliers) {
    let i = Math.floor(Math.random()*biasMultipliers.length);
    muliplier = biasMultipliers[i];
  }
  return({value, multiplier:mult});
}


//random simulate dartboard
// const darts = [];

// const addDart = (biasValues, biasMultipliers) => {
//   const {value, multiplier} = randomDart(biasValues, biasMultipliers);
//   const coords = to_coord(value, multiplier);
//   const d = Math.sqrt(coords[0]**2 + coords[1]**2);
//   const toPixel =  1080 * 25.4 / 96;
//   const dp = Math.floor(d * toPixel);
  
//   darts.push({
//     timestamp : Math.floor(Math.random()*10**8),
//     value,
//     multiplier,
//     coOrdsMM : {
//       x : coords[0], 
//       y : coords[1]
//     },
//     coOrds: {
//       x :  Math.floor(coords[0] * toPixel),
//       y :  Math.floor(coords[1] * toPixel)
//     },
//     vector: {
//       degrees:  Math.floor(coords[2] * 180 / Math.PI),
//       distancepixels: dp,
//       distancemm: d
//     },
//     debug: { delta: '0', camera_intersection: null }
//   })
// }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// exports.getDarts = async (cmd) => {
//   try {
//     const TOLERANCE = .99; 

//     //sleep upyo 1/2 sec
//     await sleep(Math.random()*500);    
    
//     if((darts.length) < 3 && Math.random() < TOLERANCE) {
//       addDart();
//     } else if((darts.length) >= 3 && Math.random() < TOLERANCE) {
//       darts.splice(0);
//     }

//     //on occasion add some darts
//     if(Math.random() > TOLERANCE) {
//       for(let i=0; i<Math.random()*4; i++) {
//         addDart();
//       }
//     }

//     //on ocassion remove some darts
//     if(Math.random() > TOLERANCE) {
//       for(let i=0; i<Math.random()*4; i++) {
//         darts.splice(Math.random()*4,1);
//       }
//     }

//     log.info(`getDarts (random) = [${util.inspect(darts)}]`);
//     const sortedDarts = darts
//     .map((el, i) => Object.assign(el, {index: i}))        //add index
//     .sort((a,b) => comp(a,b))                             //sort by timestamp , index
//     .filter((x,i,a) => i === 0 || comp(a[i-1], x) != 0);  //remove any identical objects

//     return { darts:sortedDarts, cameralines: null};
//   } catch (err) {
//     log.error(`getDarts -- [${err}]`);
//   }
// };

// get darts using socket io  via simulated web page
exports.getDarts = async (app) => {
  try {
    // console.log('exports.getDarts app = ', app);
    if(app) {
      if(app.locals.socket?.id) {
        const socket = app.locals.socket;
        const io = app.locals.io;
        console.log(`getDarts socket id `, socket.id);
        await io.emit('get darts',{data:"give it to me"});
        await socket.on('respond darts', (darts) => {
          console.log(`getDarts -- `, darts);
        });
    // const response = await axios.get(process.env.DARTBOARD_ENDPOINT);
    // log.info(`getDarts = [${util.inspect(response.data.darts)}]`);
    // const darts = response.data.darts
    // .map((el, i) => Object.assign(el, {index: i}))        //add index
    // .sort((a,b) => comp(a,b))                             //sort by timestamp , index
    // .filter((x,i,a) => i === 0 || comp(a[i-1], x) != 0);  //remove any identical objects

      }
    }

    // if()
    
    //dummy return
    return { darts:[], cameralines: []};
    // return { darts, cameralines: response.data.cameralines };
  } catch (err) {
    log.error(`getDarts -- [${err}]`);
  }
};

// getDarts via dartboard API
// exports.getDarts = async () => {
//   try {
//     const response = await axios.get(process.env.DARTBOARD_ENDPOINT);
//     log.info(`getDarts = [${util.inspect(response.data.darts)}]`);
//     const darts = response.data.darts
//     .map((el, i) => Object.assign(el, {index: i}))        //add index
//     .sort((a,b) => comp(a,b))                             //sort by timestamp , index
//     .filter((x,i,a) => i === 0 || comp(a[i-1], x) != 0);  //remove any identical objects

//     return { darts, cameralines: response.data.cameralines };
//   } catch (err) {
//     log.error(`getDarts -- [${err}]`);
//   }
// };


 