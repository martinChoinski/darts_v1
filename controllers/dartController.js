const catchAsync = require('./../utils/catchAsync');
const Dart = require('../models/dartModel');
const Dart_Journal = require('../models/dartJournalModel');
const { log } = require('../logger');
const util = require('util');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

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

const apiFormat = dart => {
  return {
   value: dart.value,
   multiplier: dart.multiplier,
   timestamp: dart.sequence,
   coOrds: { x: dart.x_coord_pixels, y: dart.y_coord_pixels, w: dart.w_pixels, h: dart.h_pixels },
   coOrdsMM: { x: dart.x_coord, y:dart.y_coord },
   vector: {
     degrees: dart.v_degrees,
     distancepixels: dart.v_distance_pixels,
     distancemm: dart.v_distance_mm
   },
   debug: { id: dart.id, when_sent: new Date(), }
 };
}

exports.updateDarts = catchAsync(async received => {
  //sort and cleanup received darts from dartboard
  const dartboard = received
    .map((el, i) => Object.assign(el, {index: i}))        //add index
    .sort((a,b) => comp(a,b))                             //sort by timestamp , index
    .filter((x,i,a) => i === 0 || comp(a[i-1], x) != 0);  //remove any identical objects
  
  if(received.length != dartboard.length) {
    log.dart(`updateDarts -- qty received[${received.length}] was reduced[${dartboard.length}] `);
  }    

  //get current set in DB
  const darts = await Dart.findAll();
  
  //matchup received with DB
  for(let dart of darts) { 
    dart.found = false;
    const matchedDart = dartboard.find(
      el => !el.id && 
      el.timestamp == dart.sequence && 
      el.value == dart.value && 
      el.multiplier ==   dart.multiplier
    );

    if(matchedDart) {
      dart.found = true;
      matchedDart.id = dart.id;
      dart.when_last_reported = new Date();
      dart.times_reported++;
      await dart.save({fields:['when_last_reported','times_reported']});
    } 
  }
  
  const newDarts = dartboard.filter(el => !el.id);
  for(let newDart of newDarts ) {
    const dartRow = {
      when_first_reported : new Date(),
      when_last_reported : new Date(),
      sequence : newDart.timestamp,
      value: newDart.value,
      multiplier: newDart.multiplier,
      x_coord: newDart.coOrdsMM.x,
      y_coord: newDart.coOrdsMM.y,
      v_degrees: newDart.vector.degrees,
      v_distance_mm: newDart.vector.distancemm,
      x_coord_pixels: newDart.coOrds.x,
      y_coord_pixels: newDart.coOrds.y,
      w_pixels: newDart.coOrds.w,
      h_pixels: newDart.coOrds.h,
      v_distance_pixels: newDart.vector.distancepixels
    };
    const createdDart = await Dart.create(dartRow);
    log.dart(`updateDart - new Dart[${util.inspect(newDart)}]`);
  } 

  const removedDarts = darts.filter(el => el.found === false);
  for(let removeDart of removedDarts ) {
    log.dart(`updateDart - Dart[${removeDart.id}] was removed and journaled`);
    const journalRow = { 
      ...removeDart.dataValues, 
      dart_id: removeDart.id, 
      id: uuidv4(), 
      when_no_longer_reported: new Date(), 
      when_journaled: new Date() 
    };
    log.debug(`journal row? = ${util.inspect(journalRow)}`);
    await Dart_Journal.create(journalRow);
    await removeDart.destroy();
  } 


  if(removedDarts.length > 0 || newDarts.length > 0 ) {
    log.dart(`updateDart - post dartboard change to game server; qty added[${newDarts.length}]; qty removed[${removedDarts.length}]`);
    const updatedDarts = await Dart.findAll();
    const darts = [];
    for(const dart of updatedDarts) {
      darts.push(apiFormat(dart));
    }
    try {
      const resp = await axios.post(process.env.GAME_SERVER, { darts:darts, cameralines: []});
      log.dart(`updateDart - was posted [${resp.data}]`);
    } catch (err) {
      log.dart(`updateDart - post to game server error[${err}]`);
    }
  }
}); 


exports.getDarts = catchAsync(async (req, res) => {
  const dbDarts = await Dart.findAll();
  log.dart(`getDarts -- current darts`);
  
  const darts = [];
  for(const dart of dbDarts) {
    log.dart(`getDarts -- [${dart.toJSON()}]`);
    darts.push(apiFormat(dart));
  }
  
  res.status(200).json({
    status: "success",
    darts: darts,
    cameras: [],
  });
});
