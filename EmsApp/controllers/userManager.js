// get user id 
module.exports = {

	// set user id into global variable
	init: function(cb){

		var fs = require('fs');

		var location = __dirname; location = location.replace('controllers','');

		if (fs.existsSync( location+'lib/user.txt')) {

			fs.readFile( location+'lib/user.txt', function(err, data){
				if(err){
					cb(err, null);
				}
				else{
					var user = data.toString().replace(/"/g,"");
					user = user.trim();
					cb(null, user); 
				}	
			});
		}
		else{
			cb('File could not find', null);
		}
	}
}