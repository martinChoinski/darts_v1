const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//see odata-sequelize as per ODATA implementation completeness
//ie query in children + $expand not yet implemented
const parseOData = require("odata-sequelize");

const { sequelize } = require("../models/db");
const decode = require('decode-uri-component');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let row = await Model.findByPk(id);

    if (!row) {
      return next(new AppError(`Unable to DELETE row ID [${id}]; as none was found`, 404));
    }

    await row.destroy();                 //delete this row    
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let row = await Model.findByPk(id);

    if (!row) {
      return next(new AppError(`Unable to UPDATE row ID [${id}] as it was NOT found`, 404));
    }

    console.log('found this row', JSON.stringify(row, null, 4));
    console.log('will update these values', JSON.stringify(req.body, null, 4));

    row = Object.assign(row, req.body);      //merge new field values
    console.log('merged new values', JSON.stringify(row, null, 4));


    fields = Object.getOwnPropertyNames(req.body);  //only update those values
    console.log('will update these columns', fields);
    await row.save({ fields });

    await row.reload();     //return newly updated row
    res.status(201).json({
      status: 'success',
      data: {
        [Model.name]: row
      }
    });
  });


exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const row = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        [Model.name]: row
      }
    });
  });

exports.getOne = (Model, passedOptions = {}) =>
  catchAsync(async (req, res, next) => {

    //query filter as per ODATA standard
    //see 
    const query = req.originalUrl.split('?')[1];
    let queryOptions = {};
    if(query && query.length > 0)  {
      queryOptions = parseOData(decode(query),sequelize);
    }
    //passed options has higher precedence
    const options  = Object.assign(queryOptions, passedOptions);
    console.log(options);
    const row = await Model.findByPk(req.params.id, options);

    if (!row) {
      return next(new AppError(`Row with ID[${req.params.id}] was not found`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        [Model.name]: row
      }
    });
  });


exports.getAll = (Model, passedOptions = {}) =>
  catchAsync(async (req, res, next) => {

    //query filter as per ODATA standard
    const query = req.originalUrl.split('?')[1];
    let queryOptions = {};
    if(query && query.length > 0)  {
      console.log('before parseOData')
      const decodeQuery = decode(query)
      console.dir(decodeQuery);
      
      queryOptions = parseOData(decodeQuery,sequelize);

      console.log('after parseOData')
      console.dir(queryOptions);
    }

    //passed options has higher precedence
    console.log('before Object Assign, queryOptions + passedOptions = ')
    console.dir(queryOptions);
    console.dir(passedOptions);
    const options  = Object.assign(queryOptions, passedOptions);
    console.dir(options);
    const rows = await Model.findAll(options);

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        [Model.name]: rows
      }
    });
  });
