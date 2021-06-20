const viewController = require('../controllers/viewController'); 
const express = require('express');
const router = express.Router({ mergeParams: true });
 
router.get('/dartboard', viewController.showDartboard);

module.exports = router;