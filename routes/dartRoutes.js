const dartController = require('../controllers/dartController'); 
const express = require('express');
const router = express.Router({ mergeParams: true });

//public routes
router.route('/')
.get(dartController.getDarts);


module.exports = router;