
const util = require('util');
const path = require('path');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { getDarts, toCoord } = require('./../utils/getDarts');
const { log } = require('../logger');

//models
const { QueryTypes, sequelize, Op } = require('../models/db');
const sql = require('./../models/sql');
const Dart = require('../models/dartModel');
const Reportt = require('../models/reportModel');
const Dart_Journal = require('../models/dartJournalModel');

//keep function here -- will clean up later and move to utils
function delay(t, val) {
  return new Promise(function(resolve) {
      setTimeout(function() {
          resolve(val);
      }, t);
  });
}


exports.showDartboard = catchAsync(async (req, res) => {

  res.status(200).render('dartboard', {
    title: 'Simulation Board',
    alerts: res.app.popAlerts()
  });
});