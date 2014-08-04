/*=========================================================
Michael Cullen
Todo CRUD - Node / Express / Angular / MySql
server.js

2014

Working - (Tá se ag obair)

Ref.
https://www.npmjs.org/package/express-myconnection
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
var bodyParser = require('body-parser');						//needed to read HTTP packet content using req.body etc
var path = require('path');
var http = require('http');
var colours = require('colors');


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var routes = require('./server/routes.js');						//Exchange routes & DB Queries 
var dbOptions = require('./server/config/database').dbOptions;	//accessing array defined in database.js

/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 

/* ========================================================== 
Set the Port the HTTP server will listen on
============================================================ */
app.set('port', process.env.PORT || 3081);							

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 


/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request to the console
		
// parse application/json
app.use(bodyParser.json()) //Get info from $HTTP POST/PUT packets - needed for req.body

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
Create HTTP Server using Express
============================================================ */
var server = http.createServer(app);

/* ========================================================== 
Bind to a port and listen for connections on it 
============================================================ */
server.listen(app.get('port'), function() {
  console.log('Express HTTP server listening on port ' .red + app.get('port')  ) ;
});

