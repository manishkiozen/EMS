var hostile = require('hostile');
var exec = require('child_process').exec;

// Manage rules through socket
module.exports = {

	manage: function(){

		// individually apply restriction on user system by admin
		socket.on('apply-restriction', function(domain){
			console.log('apply-restriction');
			// append lines into system hosts file
			hostile.set('127.0.0.1', domain, function (err) {
				if (err) {
				   console.error(err)
				} else {
				   	console.log('set /etc/hosts successfully!');
				   	// clear cache information and restart
				 //   	exec('/etc/init.d/nscd restart', function (error, stdout, stderr) {
					// 	  if (error !== null) {
					// 	    console.log('exec error in top: ' + error);
					// 	  }
					// });
				}
			});
		});
		
		// apply restriction on user system by admin
		socket.on('apply-restriction-all', function(domain){
			console.log('apply-restriction');
			// append lines into system hosts file
			hostile.set('127.0.0.1', domain, function (err) {
				if (err) {
				   console.error(err)
				} else {
				   	console.log('set /etc/hosts successfully!');
				   	// clear cache information and restart
				 //   	exec('/etc/init.d/nscd restart', function (error, stdout, stderr) {
					// 	  if (error !== null) {
					// 	    console.log('exec error in top: ' + error);
					// 	  }
					// });
				}
			});
		});

		// individual remove restriction on user system by admin
		socket.on('remove-restriction', function(domain){
			console.log('remove-restriction');
			// read file where manage rules
			hostile.remove('127.0.0.1', domain, function (err) {
				if (err) {
				   console.error(err)
				} else {
				    console.log('set /etc/hosts successfully!');				   
				}
			});
		});
		
		// individual remove restriction on user system by admin
		socket.on('remove-restriction-all', function(domain){
			console.log('remove-restriction');
			// read file where manage rules
			hostile.remove('127.0.0.1', domain, function (err) {
				if (err) {
				   console.error(err)
				} else {
				    console.log('set /etc/hosts successfully!');				   
				}
			});
		});

	}	
}