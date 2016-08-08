'use strict';

var express = require('express');
var moment = require('moment');

var app = express();

app.get('/', function(req, res){
	res.send("<h1>Timestamp Microservice</h1>")
});
app.get('/:date', function(req, res){

	//check if natural
	var n = moment(req.params.date);

	if(n.isValid()){
		
		return res.json({
			"unix": n.unix(),
			"natural": n.format("MMMM DD, YYYY")
		});
	}

	//check if unix
	var m = moment(parseFloat(req.params.date) * 1000);
	if(m.isValid()){
		
		return res.json({
			"unix": m.unix(),
			"natural":m.format("MMMM DD, YYYY")
		});
	}

	return res.json({
			"unix": null,
			"natural":null
		});
	
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Node.js is listening on port " + port + "...")
});

