// Manage System login, logout and system performance information
var spawn = require('child_process').spawn;
var async = require('async');
var request = require('request');
var dateTime = require('../lib/dateTime');
var os = require("os");
var sysIntervalObj;
var fs = require('fs'); 
var lastLoginId = 0;

// set current date time
if (!Date.now) {
	Date.now = function() { return new Date().getTime(); }
}

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

module.exports = systemLog = {

	// system login
	systemLogin: function(){
		
		var location = __dirname; location = location.replace('controllers','');
		var sysName =  os.hostname();

		// Configure the request
        var options = {
            url: EMSURL+'api/systemaction',
            method: 'POST',
            headers: headers,
            form: { action : 'systemaction', userId: userID, date: dateTime.getDate() , time: dateTime.getTime(), sysName: sysName }
        }

    	// Start the request of system login
        request(options, function (error, response, body) {
           // console.log('opt'+JSON.stringify(options)+'\n responst'+JSON.stringify(response)+'\n'+'error '+error+'\n')

            if (!error && response.statusCode == 200) {
                // Print out the response body
                fs.appendFile(location+'log.log', 'send system login time response: ' + body + ' \n', function(err, out){});
				//console.log('systemLogin=>'+JSON.stringify(body)+'\n'+ typeof body);
				body = JSON.parse(body);
				lastLoginId = body.lastLoginId;
            }
            else{
            	// show error
            	fs.appendFile(location+'log.log', 'send system login time error: ' + error + ' \n', function(err, out){});
				//console.log('systemLogin error=>'+JSON.stringify(error) );
            }
        });
	},

	systemPerformance: function(){
		
		//console.log('intervalMonitorTime=>'+intervalMonitorTime);
		var location = __dirname; location = location.replace('controllers','');
		
		// get system performance
		if( intervalMonitorTime != '' ){
			
			sysIntervalObj = setInterval(function(){
			
				// check userID
				if( userID != ''){

					var ps = spawn('Tasklist');

					// executes TOP Command
					async.parallel([ function(cb) {
				        // get system running services and application information
				    	ps.stdout.on('data', function (data) {
					    	// console.log('lastLoginId=>'+lastLoginId+'\n');
					    	// Configure the request
					        var options = {
					            url: EMSURL+'api/systemrunning',
					            method: 'POST',
					            headers: headers,
					            form: { action : 'systemrunning', sysPerformance: data, userId: userID, lastLoginId: lastLoginId, currentDateTime: dateTime.getDate() + ' ' + dateTime.getTime() }
					        }

					    	// Start the request
					        request(options, function (error, response, body) {
					           // console.log('opt'+JSON.stringify(options)+'\n responst'+JSON.stringify(response)+'\n'+'error '+error+'\n')

					            if (!error && response.statusCode == 200) {
					                // Print out the response body
					                fs.appendFile(location+'log.log', 'send system running application: ' + body + ' \n', function(err, out){});
					                // callback();
									// console.log('systemrunning=>'+JSON.stringify(body) );
					            }
					            else{
					            	// show error
					            	fs.appendFile(location+'log.log', 'send system running application error: ' + error + ' \n', function(err, out){});
					            	// callback();
									// console.log('systemrunning error=>'+JSON.stringify(error) );
					            }
					        });

						});

						ps.stderr.on('data', function (data) {
						  fs.appendFile(location+'log.log', 'ps stderr: ' + data + ' \n', function(err, out){});
						});
						
				    },
					function(cb) {
						
						var ps = spawn('Tasklist');

						var rand_tokens = userID+( systemLog.getRandomNumber() );
						
				        // get system running services and application information
				    	ps.stdout.on('data', function (data) {
					    	
					    	// Configure the request
					        var options = {
					            url: EMSURL+'api/systemapplog',
					            method: 'POST',
					            headers: headers,
					            form: { action : 'systemApprunning', appLog: data, userId: userID, currentDateTime: dateTime.getDate() + ' ' + dateTime.getTime(), app_token: rand_tokens, duration:intervalMonitorTime }
					        }
						
					    	// Start the request
					        request(options, function (error, response, body) {
					           // console.log('opt'+JSON.stringify(options)+'\n responst'+JSON.stringify(response)+'\n'+'error '+error+'\n')

					            if (!error && response.statusCode == 200) {
					                // Print out the response body
					                fs.appendFile(location+'log.log', 'send system running application: ' + body + ' \n', function(err, out){});
					                // callback();
									// console.log('systemapplog =>'+JSON.stringify(body) );
					            }
					            else{
					            	// show error
					            	fs.appendFile(location+'log.log', 'send system running application error: ' + error + ' \n', function(err, out){});
					            	// callback();
									// console.log('systemapplog error=>'+JSON.stringify(error) );
					            }
					        });

						});

						ps.stderr.on('data', function (data) {
						  fs.appendFile(location+'log.log', 'ps stderr: ' + data + ' \n', function(err, out){});
						});
						
				    }], function done(err, results) {
				        if (err) {
				            //throw err;
							console.log('err=>'+JSON.stringify(err) );
				        }
				        console.log("\n system log Done!");
				    });

				}			

			},intervalMonitorTime);

		} // end if block
	},

	systemIntervalReset: function(){
		// clear set interval
		clearInterval(sysIntervalObj);
		// recall performance object
		systemLog.systemPerformance();
	},
	
	getRandomNumber: function(){
		return Math.floor(Date.now() / 1000);
	}

}