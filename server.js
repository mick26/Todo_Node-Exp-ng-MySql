/*=========================================================
Michael Cullen
Todo CRUD - Node / ExpressV4 / Angular / MySql
server.js

May 2014

Working - (Tá se ag obair)

Ref.
https://gist.github.com/pwalczyszyn/6761609 
http://codetrash.com/category/nodejs/92/simple-crud-nodejs-mysql
http://stackoverflow.com/questions/15792331/felixge-node-mysql-separate-connection-file
http://www.hacksparrow.com/global-variables-in-node-js.html 
============================================================*/

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express  = require('express');								//Express v4.1 Web server
var mysql = require('mysql');									//mysql module
var myConnection = require('express-myconnection'); 			//express-myconnection module
var logger   = require('morgan');								//logger middleware
var bodyParser = require('body-parser');						//needed to read Http packet content using req.body etc
var path = require('path');

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js');						//Exchange routes & DB Queries 
var dbOptions = require('./server/config/database').dbOptions;	//accessing array defined in database.js

/* ========================================================== 
Port the server will listen on
============================================================ */
var port = process.env.PORT || 3081; 					

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 		

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 


/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request to the console
app.use(bodyParser()); 		//Get info from $HTTP POST/PUT packets - needed for req.body


/* ========================================================== 
Connect to MySql database using express-myconnection middleware
DB settings are contained in var dbOptions defined in database.js
single database connection. Connection is never closed. 
In case of disconnection it will try to reconnect again
============================================================ */

app.use(myConnection(mysql, dbOptions, 'single'));


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
var server = app.listen(port, function() {
	console.log('Listening on port %d', server.address().port);
	console.log("========LISTENING=========")
});


