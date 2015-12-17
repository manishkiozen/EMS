// Manage rules through socket

var fs = require('fs');

module.exports = {

	manage: function(){

		// update set system monitoring interval time
		socket.on('monitor-interval', function(intervalTime){

			// read file where manage rules
			fs.readFile(process.cwd()+'/lib/rules.json', function(err, result){
				if(err){
					throw err;
				}
				else{

					var res = JSON.parse(result);

					res.data.intervalMonitorTime = intervalTime;
					intervalMonitorTime = intervalTime;
					
					// update rules file
					fs.writeFile(process.cwd()+'/lib/rules.json', JSON.stringify(res), function(err, data){
						if(err){
							console.log(err);
						}
						else{ 
							// system log manager
							var systemLogManager = require('./systemLogManager');
							systemLogManager.systemIntervalReset(); // reset interval setting
						}						
					});
				}
			});
		});

		// update set system screenshot interval time
		socket.on('screenshot-interval', function(intervalTime){

			// read file where manage rules
			fs.readFile(process.cwd()+'/lib/rules.json', function(err, result){
				if(err){
					throw err;					
				}
				else{

					var res = JSON.parse(result);
					res.data.intervalSnapTime = intervalTime;
					intervalSnapTime = intervalTime;
					
					// update rules file
					fs.writeFile(process.cwd()+'/lib/rules.json', JSON.stringify(res), function(err, data){
						if(err){
							console.log(err);
						}
						else{ 
							// system log manager
							var screenShotManager = require('./screenShotManager');
							screenShotManager.screenshotReset(); // reset interval setting
						}						
					});
				}
			});
		});


		// update set system screenshot interval time
		socket.on('screenshot-dimension', function(height, width){

			// read file where manage rules
			fs.readFile(process.cwd()+'/lib/rules.json', function(err, result){
				if(err){
					throw err;
					callback();
				}
				else{

					var res = JSON.parse(result);
					// set snap dimension information
					res.data.snapHeight = height;
					res.data.snapWidth = width;
					snapHeight = height;
					snapWidth = width;
					
					// update rules file
					fs.writeFile(process.cwd()+'/lib/rules.json', JSON.stringify(res), function(err, data){
						if(err){
							console.log(err);
						}
						else{ 
							// system log manager
							var screenShotManager = require('./screenShotManager');
							screenShotManager.screenshotReset(); // reset interval setting
						}						
					});
				}
			});
		});

		// update set system screenshot interval time
		socket.on('screenshot-popupMessage', function(message){

			// read file where manage rules
			fs.readFile(process.cwd()+'/lib/rules.json', function(err, result){
				if(err){
					throw err;					
				}
				else{

					var res = JSON.parse(result);
					res.data.popupMessage = message;
					popupMessage = message;
					
					// update rules file
					fs.writeFile(process.cwd()+'/lib/rules.json', JSON.stringify(res), function(err, data){
						if(err){
							console.log(err);
						}
						else{ 
							// system log manager
							var screenShotManager = require('./screenShotManager');
							screenShotManager.screenshotReset(); // reset interval setting
						}						
					});
				}
			});
		});

	}	
}