var appName = angular.module('appName',['ui.bootstrap','ui.router']);

//Routing
appName.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'appController',
    })

    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/404");

});

//Handle all HTTP calls to server
appName.factory('appSession', function($http){
    return {
       	updateNewTask: function(name, detail, deadLine) {
        	return $http.post('server/updateTask.php',{
        		type		: 'newTask',
        		taskName	: name,
        		taskDetail 	: detail,
        		deadLine 	: deadLine
        	});
        }
    }
});
//controller
appName.controller('appController', function($scope, appSession){

	$scope.taskList = [];
	$scope.task;
	$scope.taskDetail;
	$scope.deadLine;
	$scope.alerts = [];
	$scope.searchText;
	
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.updateTasks= function(data, status){
        console.log("Success");
    };
    $scope.displayError = function(data, status){
        console.log("Error");
    };
  	//Initializer
	init();
	function init(){
		
		appSession.updateNewTask().success($scope.updateTasks).error($scope.displayError);
	};
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
});