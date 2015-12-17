/*************************************
* User Authentication Controller
*************************************/
var fs = require('fs');

var LoginController = function(){
	
	var location = __dirname; location = location.replace('controllers','');

	this.index = function(){

		if (fs.existsSync( location+'lib/user.txt')) {

			 fs.readFile( location+'lib/user.txt', function(err, data){
				if(err){
					Res.render('login'+fileExt,{url:url, errors: false, success: 0});		
				}
				else{
					console.log('data=>'+data)
					if( data != undefined || data != ''){
						Res.render('login'+fileExt,{url:url, errors: false, success: 1});	
					}
					else{
						Res.render('login'+fileExt,{url:url, errors: false, success: 0});	
					}
				}

				Res.end();
			});
		}
		else{
			Res.render('login'+fileExt,{url:url, errors: false, success: 0});
			Res.end();
		}

		//Res.render('login'+fileExt,{url:url, errors: false, success: 0});		
		
	}

	this.userLogin = function(){

		var request = require('request');
		var os = require("os");
		var sysName =  os.hostname();

		// Configure the request
        var options = {
            url: EMSURL+'login/login',
            method: 'POST',
            headers: { 
				    'User-Agent':       'Super Agent/0.0.1',
				    'Content-Type':     'application/x-www-form-urlencoded'
					},
            form: { action : 'login', username: Req.body.username, password: Req.body.password, sysName: sysName }
        }

     	// Start the request of system login
        request(options, function (error, response, body) {
           // console.log('opt'+JSON.stringify(options)+'\n responst'+JSON.stringify(response)+'\n'+'error '+error+'\n')

            if (!error && response.statusCode == 200) {
                // Print out the response body
                body = JSON.parse(body);

                if( body.status == 1 ){

                	Res.render('login'+fileExt,{url:url, errors: false, success: 1});	

	                fs.writeFile( location+'lib/user.txt', body.user_id, function(err, data){
						if(err){
							console.log(err);
						}
						else{
							// call ems manager
							var emsManager = require('../lib/emsManager');
							emsManager.init();
						}
					});	
                } 
                else{
                	Res.render('login'+fileExt,{url:url, errors: body.msg, success: 0});		
                }               
            }
            else{
            	// show error
            	console.log('error=>'+error);
            }

            Res.end();
        });
	}
}

LoginController.__proto__ = new controller();

module.exports = LoginController;