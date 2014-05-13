/**
 * Module - for the Controllers
 */

angular.module('mongoDbApp.controllers', [])


/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope, $http) {

	$scope.formData = {};

	/*================================================================
		READ - $http get
	=================================================================*/
	// when landing on the page, get all todos and show them
	$http.get('/api/todos')

		//success - callback fn
		.success(function(data, status, headers, config) {
			$scope.todos = data;
			console.info("Status: " + status);						//TEST
			console.info("Config: " + JSON.stringify(config));		//TEST
			console.info("Config: " + JSON.stringify(data));		//TEST
		})

		//error - callback fn
		.error(function(data, status, headers, config) {
			console.log('Error: ' + data);
		});


	/*================================================================
		CREATE - $http post
	=================================================================*/
	$scope.createTodo = function() 
	{
		console.info("CreateTodo formData: " + JSON.stringify($scope.formData));//TEST

		$http.post('/api/todos', $scope.formData)

			//success
			.success(function(data, status, headers, config) {
				$scope.todos = data;
				console.info("Status: " + status);
				console.info("Config: " + JSON.stringify(config));
			})

			//error
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};


	/*================================================================
		UPDATE - $http put
	=================================================================*/
	$scope.editTodo = function (id, txt, isDone) {

		/*	 
		console.info("in controller.js editTodo");	//TEST
		console.info("ID: " + id);					//TEST
		console.info("text: " + txt);				//TEST
		console.info("isDone: " + isDone);			//TEST
		*/
		var editData = {"text":txt, "done": isDone};

		$http.put('/api/todos/' + id, editData)

		//success
		.success(function(data, status, headers, config) {
			$scope.todos = data;
			console.info("Put Status: " + status);
			console.info("Config: " + JSON.stringify(config));
		})

		//error
		.error(function(data) {
			console.log('Error Updating: ' + data);
		});
	};


	/*================================================================
		DELETE - $http delete
	=================================================================*/
	$scope.deleteTodo = function(id) 
	{
		$http.delete('/api/todos/' + id)

			//success
			.success(function(data, status, headers, config) {
				$scope.todos = data;
				console.info("Status: " + status);
				console.info("Config: " + JSON.stringify(config));
			})

			//error
			.error(function(data) {
				console.log('Error deleting: ' + data);
			});
	};
})
