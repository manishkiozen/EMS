var exec = require('child_process').exec;
var fs = require('fs');
var dateTime = require('../lib/dateTime');
var os = require("os");
var sysName =  os.hostname();
var child;

// start socket module
module.exports = {
	init: function(){

		// socket connect with server
		socket.on("connect", function(){
			socket.emit("joinRoom", userID+sysName);
			socketFlag = true;						
		});

		// disconnect socket
		socket.on("disconnect", function(){
			socketFlag = false;
		});
		
		// get command from server
		socket.on("command", function(c){
			
			// executes `pwd`
			child = exec(c, function (error, stdout, stderr) {

			  if (error !== null) {
			    console.log('exec error: ' + error);

			    // send error message to server
			    socket.emit('commandStatus', 'Command could not execute!');
			  }
			  else{
			  	socket.emit('commandStatus', 'Command execute successfully!');
			  }

			});

		});

		//socket.emit('system-apply-restriction', userID+sysName, 'facebook.com');
		//socket.emit('system-apply-restriction', userID+sysName, 'www.facebook.com');

		// manage rules set by admin through socket
		var rulesManager = require('../controllers/rulesManager');
		rulesManager.manage();

		// manage rules set by admin through socket
		var restrictionManager = require('../controllers/restrictionManager');
		restrictionManager.manage();
	}
}
