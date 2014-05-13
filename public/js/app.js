/**
 * Module - Main Module
 */

angular.module('mongoDbApp', ['mongoDbApp.controllers', 'ngRoute'])


.config(function ($routeProvider, $locationProvider) {
	$routeProvider
    
      .when('/', {
        templateUrl: 'views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
    
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  
  });