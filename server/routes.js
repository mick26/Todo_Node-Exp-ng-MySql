/*================================================================
	Server side Routing
	
	Client side AJAX requests come from Angular $http service in the Controller 
	to the RESTful API.	Depending on the REST route/endpoint the MySql database 
	is Queried appropriately. The AJAX response is then sent back to the Angular Client.

	MySql DB table name is: 'todos'
=================================================================*/

module.exports = function(app) 
{

	/*================================================================
		CREATE - $http post
	=================================================================*/
	//create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

  		req.getConnection(function(err, connection) {

  			//Data to be saved to the DB - taken from $http request packet
			var data = {
				text : req.body.text,
				done : false
			};

			//Query the MySQL DB - insert into will add a new row
	     	var query = connection.query("INSERT INTO todos set ? ", data, function(err, rows)
	        {
	   			//Error callback - problem with querying DB    
	            if(err) {
	                console.log("Error Selecting : %s ", err );
	                res.send(err);
	            }

	            //success callback - queried DB ok
	     		else {
	     			//Query DB to get the DB contents
					connection.query( 'SELECT * FROM todos', function(err, results, fields) 
			   		{
			   		//error getting data from DB
			    	if (err) 
			      	{
			        	console.log("ERROR: " + err.message);
			        	return res.send(err);
			          	//throw err;
			      	}

			      	//Got Data from DB
			      	//Convert MySql TinyInt (0 or 1) datatype to Boolean (true or false)
	      			for(i=0; i< results.length; i++) {
	      				results[i].done = Boolean(results[i].done);
	      			};

			      	console.log("Got "+ results.length +" Rows:");
			      	console.log(results);
			      		return res.json(results); // return all todos in JSON format
					//	return res.json(todos); // return all todos in JSON format
					})
	     		}
	         });
    	});
    }); 


	/*================================================================
		READ - $http get
	=================================================================*/
	//Get all todos in the database

	app.get('/api/todos', function(req, res) 
	{

		req.getConnection(function(err, connection) {
      		if (err) 
      			return next(err);

			connection.query( 'SELECT * FROM todos', function(err, results, fields) 
		   	{
		    	if (err) 
		      	{
		        	console.log("ERROR: " + err.message);
		        	return res.send(err);
		          	//throw err;
		      	}

		      	//Convert MySql TinyInt (0 or 1) datatype to boolean (true or false)
		      	for(i=0; i< results.length; i++) {
		      		results[i].done = Boolean(results[i].done);
		      	};

		      	//console.log("Got "+ results.length +" Rows:");		//TEST
		      	//console.log(results);									//TEST
		      	return res.json(results); // return all todos in JSON format

    		})
		});
	});

	/*================================================================
		UPDATE - $http put
	=================================================================*/

	app.put('/api/todos/:todo_id', function(req, res) {

  		req.getConnection(function(err,connection) {

  			var id = req.params.todo_id;

			var data = {
				text : req.body.text,
				done: req.body.done
			};

 
	     	var query = connection.query("UPDATE todos set ? WHERE id = ? ",[data, id], function(err, rows)
	        {
	            if(err) {
	                console.log("Error Selecting : %s ", err );
	                res.send(err);
	            }

	     		else {
	     			console.log("posted ok: "+ data);

					connection.query( 'SELECT * FROM todos', function(err, results,fields) 
			   		{
			    	if (err) 
			      	{
			        	console.log("ERROR: " + err.message);
			        	return res.send(err);
			          	//throw err;
			      	}

			      	//Convert MySql TinyInt (0 or 1) datatype to boolean (true or false)
	      			for(i=0; i< results.length; i++) {
	      				results[i].done = Boolean(results[i].done);
	      			};

			      	//console.log("Got "+ results.length +" Rows:");		//TEST
			      	console.log(results);
			      		return res.json(results); // return all todos in JSON format
					})
	     		};
	         });
    	});
    }); 


	/*================================================================
		DELETE - $http delete
	=================================================================*/

	app.delete('/api/todos/:todo_id', function(req, res) 
	{

		var id = req.params.todo_id;

	    req.getConnection(function (err, connection) {
        
	        connection.query("DELETE FROM todos WHERE id = ? ",[id], function(err, rows)
	        {            
	            if(err)
	                 console.log("Error deleting : %s ",err );

	     		else {
	     			console.log("Deleted row: "+ rows);

					connection.query( 'SELECT * FROM todos', function(err, results,fields) 
			   		{
			    	
				    	if (err) 
				      	{
				        	console.log("ERROR: " + err.message);
				        	return res.send(err);
				          	//throw err;
				      	}

				      	//Convert MySql TinyInt (0 or 1) datatype to boolean (true or false)
		      			for(i=0; i< results.length; i++) {
		      				results[i].done = Boolean(results[i].done);
		      			};

				      	console.log("Got "+ results.length +" Rows:");
				      	console.log(results);
				      	return res.json(results); 		//return all todos in JSON format
					})
		     	};
	        });       
     	});
	});
};