/*************************************
* App configuration
**************************************/

// define global configuration of app
global.defaultPage = 'login.html';
global.defaultController = 'login';
global.fileExt = '.html';
global.secretKey = 'ssshhhhh';
global.view = 'views';
global.resource = 'public';
global._portRedis   = 6379;
global._HostRedis   = '127.0.0.1';
global.portNo = process.env.PORT || '8085'; 
global.accessPath = 'localhost';
global.url = 'http://' + accessPath + ':'+portNo;
global.targeMachine = 'http://54.254.247.219:8081';
global.EMSURL = 'http://54.254.247.219/ems/index.php/';
//http://128.199.66.216/ems/
// http://localhost:82/php/test.php

global.userID='';
global.socketFlag = false;
global.systemToken = '';

module.exports = {
	init:function(){
		var server = require('./server');
		server.init();
	}
}
