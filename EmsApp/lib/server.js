/************************
** add require module
************************/

var express = require('express'),
			path = require('path'),
			http = require('http'),
			ejs = require('ejs'),
			logger = require('morgan'),
			bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser'),
			methodOverride = require('method-override'),
			expressSession = require('express-session'),
			routes = require('../routes/routes'),
			redis = require('redis'),
			redisIO = require('socket.io-redis'),
			redisStore = require('connect-redis')(expressSession);
			

module.exports = obj = {
	
	startApp: function(){

		 // store promise module globally
		global.socket = require('socket.io-client')(targeMachine);
		//socket.manager(redisIO({ host: _HostRedis, port: _portRedis }));

		// include socket file
		// var ios = require('./socket');
		// ios.init();

		var emsManager = require('./emsManager');
		emsManager.init();

		// start express app
		var app = express();
		var router = express.Router();

		// set application enviornment 
		app.set('port', portNo);
		app.set('views', path.join(__dirname, '..', '/'+view));
		app.set('view engine', 'html');
		app.engine('html', ejs.renderFile);	

		// configure application  
	    app.use( express.static( path.join(__dirname, '..', '/'+resource) ) );   // set the static files location
	    app.use(logger('dev'));                         // log every request to the console
	    app.use(bodyParser.json()); // parse request data into json
	    app.use(bodyParser.urlencoded({extended:false})); 
	    app.use(cookieParser()); 
		
	    app.use(methodOverride());    // simulate DELETE and PUT

		app.use(router); 
	    // set file rendering
	    routes.init(router);

		// create server
		var server = http.createServer(app);

		server.listen(portNo);
		server.on('listening', function(){
			console.log('Server started at ' + accessPath + ':'+portNo+' \n');
		});

		server.on('error', function(error){
			console.log('Server could not started at ' + accessPath + ':'+portNo+' \n'+error);
		});
	},

	init:function(){
		obj.startApp();
	}
}
