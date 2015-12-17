var exec = require('child_process').exec;
var fs = require('fs');
var dateTime = require('../lib/dateTime');
var request = require('request');
var screenShotObj;

// manage user 
module.exports = screenShot = {

	// set user id into global variable
	init: function(){

		//console.log('intervalMonitorTime=>'+intervalSnapTime+' \n snapWidth=>'+snapWidth+' \n snapHeight=>'+snapHeight);
		var location = __dirname; location = location.replace('controllers','');

		//Set the headers
		var headers = {
		    'User-Agent':       'Super Agent/0.0.1',
		    'Content-Type':     'application/x-www-form-urlencoded'
		}

		// get system snap shoot
		if( intervalSnapTime != '' ){
			
			/*var child = exec(location+'thirdParty/nircmd/nircmd.exe loop -1 '+intervalSnapTime+' savescreenshot "'+location+'screenshot/com-'+userID+'-~$currdate.MM-yyyy$\~$currdate.MM-dd-yy$-~$currtime.HHmm$-~$currtime.HHss$.png"', function (error, stdout, stderr) {
				if (error !== null) {
					fs.appendFile(location+'log.log', 'exec error in screenshot: ' + error + ' \n', function(err, out){});
				}
			});*/
			
			screenShotObj = setInterval(function(){
			
				// check userID
				if( userID != ''){

					// executes TOP Command
					if (!Date.now) {
				    	Date.now = function() { return new Date().getTime(); }
					}

					var filename = Math.floor(Date.now() / 1000)+'.png';
					// loop -1 300000
					var child = exec('START /B '+location+'thirdParty/nircmd/nircmd.exe savescreenshot "'+location+'screenshot/'+filename+'"', function (error, stdout, stderr) {
					  	if (error !== null) {
					    	fs.appendFile(location+'log.log', 'exec error in screenshot: ' + error + ' \n', function(err, out){});
							//console.log('screen error=>'+JSON.stringify(error) );
					  	}
					//fs.readdir(location+'screenshot/', function(err, items) {
					//	if (err) return err;
					  	else{
							
							screenShot.screenShotPopupMessage(); // show notification
							
							var path = location+'screenshot/'+filename;
							// Configure the request
							var options = {
								url: EMSURL+'api/systemscreenshots',
								method: 'POST',
								headers: headers,
								form: {action: 'systemscreenshots', user: userID, date: dateTime.getDate() , time: dateTime.getTime(), file: screenShot.base64_encode(path), filename: filename }
							}

							// send screen shot to server
							request(options, function (error, response, body) {

								if (!error && response.statusCode == 200) {
									// Print out the response body
									fs.appendFile(location+'log.log', 'image send to server: ' + body + ' \n', function(err, out){});
									fs.unlink(path);
									//console.log('screenshot=>'+JSON.stringify(body) );
								}
								else{
									// show error
									fs.appendFile(location+'log.log', 'image send to server failed: ' + error + ' \n', function(err, out){});
									//console.log('screenshot error=>'+JSON.stringify(error) );
								}
							});
					  	}
					});
				}			

			}, intervalSnapTime); 

		}
	},

	screenShotPopupMessage: function(){
		//console.log('popup message=>'+popupMessage);
		// show popup message
		// @notifu /p "Hello, World!" /m "Thank you for giving my Notifu utility a try. I hope it will make you a hero (or at least make your life easier).\n\n(this notification will disapear after 15 seconds)" /d 15 /i notifu.exe
		
		var location = __dirname; location = location.replace('controllers','');

		// store notification command
		var command = '@notifu /p "EMS Rules" /m "'+popupMessage+'" /i notifu.exe';
		// show notification
		var child = exec('cd '+location+'/thirdParty/notif && '+command+' && exit', function (error, stdout, stderr) {
		  	if (error !== null) {
		    	//console.log('exec error in top: ' + error);
		    	fs.appendFile(location+'log.log', 'show notification error: ' + error + ' \n', function(err, out){});
		  	}
		  	else{
		  		// change working directory
		  		child = exec('cd '+location+' && exit', function (error, stdout, stderr) {
		  			if (error !== null) {
				    	fs.appendFile(location+'log.log', 'change notification directory error: ' + error + ' \n', function(err, out){});
				  	}
		  		});
		  	}	
		});
	},

	screenshotReset: function(){
		// clear set interval
		clearInterval(screenShotObj);
		// recall screen taken method
		screenShot.init();
	},

	// function to encode file data to base64 encoded string
	base64_encode: function(file) {
	    // read binary data
	    var bitmap = fs.readFileSync(file);
	    // convert binary data to base64 encoded string
	    return new Buffer(bitmap).toString('base64');
	},

	// function to create file from base64 encoded string
	base64_decode: function(base64str, file) {
	    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
	    var bitmap = new Buffer(base64str, 'base64');
	    // write buffer to file
	    fs.writeFileSync(file, bitmap);
	}
}
