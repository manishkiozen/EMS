var exec = require('child_process').exec;
var location = __dirname; location = location.replace('bin','');

var child = exec('START /B forever stop '+location+'/app.js', function (error, stdout, stderr) {
	if (error !== null) {
		fs.appendFile(location+'log.log', 'exec error in forever: ' + error + ' \n', function(err, out){});
	}
	else{
		console.log('Kill forever');
	}
});