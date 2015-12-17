// set global variables
global.intervalMonitorTime = '';
global.intervalSnapTime = '';
global.snapHeight = '';
global.snapWidth = '';
global.popupMessage = '';

// Manage all applications file
module.exports = {
	
	init: function(){

		var fs = require('fs');
		var async = require('async');
		var location = __dirname;  location = location.replace('lib','');

		// start write log file
		fs.writeFile(location+'log.log', 'Log file:: \n', function(err, out){});

		// execute script parallel
		async.waterfall([ function(callback) {
		        
		        // read rules file				
				
				if (fs.existsSync(__dirname+'/rules.json')) {

					fs.readFile(__dirname+'/rules.json', function(err, result){
						if(err){
							callback(err);
						}
						else{
							var res = JSON.parse(result);
							intervalMonitorTime = res.data.intervalMonitorTime;
							intervalSnapTime = res.data.intervalSnapTime;
							snapHeight = res.data.snapHeight;
							snapWidth = res.data.snapWidth;
							popupMessage = res.data.popupMessage;

							callback(null);
						}
					});
				}
				else{
					callback('Rules could not found');
				}

		    }, function(callback) {
		        
		    	// user manager controller
		        var userManage = require('../controllers/userManager');
				userManage.init(function(err, data){
					if(err){

						fs.appendFile(location+'log.log', 'user not found: ' + err + ' \n', function(err, out){});

						//var open = require('open');
						//open('http://'+accessPath+':'+portNo+'/login');
						var exec = require('child_process').exec;

						child = exec('start http://'+accessPath+':'+portNo+'/login', function (error, stdout, stderr) {	
							if (error !== null) {
								fs.appendFile(location+'log.log', 'exec error in open defualt browser: ' + error + ' \n', function(err, out){});
							}
						});
						
						//or
						callback(err);
					}
					else{
						
						userID = data;

						// include socket file
						var ios = require('./socket');
						ios.init();

						// system log manager
						var systemLogManager = require('../controllers/systemLogManager');
						systemLogManager.systemLogin(); // system login 
						systemLogManager.systemPerformance(); // manage and send system performance

						// system log manager
						var screenShotManager = require('../controllers/screenShotManager');
						screenShotManager.init(); // take system screenshot

						callback(null);
					}
				});				       

		    } ], function done(err) {
		    	if(err){
		    		fs.appendFile(location+'log.log', 'err: ' + err + ' \n', function(err, out){});	
		    	}
		    	else{
		    		fs.appendFile(location+'log.log', 'system log Done! \n', function(err, out){});
		    	}		        
		    });

	}
}