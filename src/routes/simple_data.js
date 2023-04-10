var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.send('List all Sample Data');

});

router.get("/add", function(request, response, next){

	response.send('Add Sample Data');

});

module.exports = router;