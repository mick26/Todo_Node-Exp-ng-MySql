## Synopsis
 
A CRUD App.
Angular client sends AJAX requests from the Controller using the $HTTP service with verbs post, get, put and delete.

- Built with NodeJS, ExpressJS, AngularJS and a MySql database


Node/Express provides the RESTful API through which the MySql database is queried. An AJAX response $http packet is then sent back by the server to the Angular client.


The program is mainly based on a Node Todo Tutorial on [scotch.io](http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular). The tutorials on [scotch.io](http://scotch.io) are quite good.


# Requirements

* Node
* MySql database running on the default port. A database needs to be created having one table with 3 fields. 
User permissions should be set to allow read, write, delete operations.	
	+ id:  type Int set to Auto Increment (primary key), 
	+ text:  type varchar,
	+ done: type TinyInt (nearest to Boolean available) 


## Installation

* Clone the Repository
* npm install - install all the node packages listed in the package.json file 
* bower install - installs the front end packages listed in the bower.json file
* Open ../server/config/database.js and enter MySql database connection details
* Turn on MySQL database
* node server.js - start up Node\Express server
* Browse to http://localhost:3081


## Motivation
 
On my journey learning Node and AngularJS.
Technologies used: Node, Express 4.1, Angular, MySql, REST API, Bower, sql queries,
$http service to make AJAX requests from AngularJS Controller.
Ajax response from the server back to Angular.


Michael Cullen
2014
