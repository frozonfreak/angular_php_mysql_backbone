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
    .state('link', {
      url: "/link",
      templateUrl: "partials/link.html",
      controller: 'appLinkController',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/404");

});

//Handle all HTTP calls to server
appName.factory('appSession', function($http){
    return {
       	getCode: function() {
        	return $http.post('server/updateTask.php',{
        		type		: 'getCode'
        	});
        },
        GenerateQRLink: function(){
          return $http.post('server/updateTask.php',{
            type    : 'generateQRLink'
          });
        },
        checkCodeValidity: function(code){
          return $http.post('server/updateTask.php',{
            type    : 'checkCodeValidity',
            code    : code
          });
        }
    }
});
//controller
appName.controller('appController', function($scope, appSession){

	$scope.code;

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.updateTasks= function(data, status){
        if(data["status"] == 1)
          $scope.code = data["message"];
    };
    $scope.updateAftCodeCheck = function(data, status){
        console.log(data);
    };
    $scope.displayError = function(data, status){
        console.log("Error");
    };
    $scope.checkCodeValidity = function(){
      appSession.checkCodeValidity($scope.code).success($scope.updateAftCodeCheck).error($scope.displayError);
    };

  	//Initializer
	init();
	function init(){
		
		appSession.getCode().success($scope.updateTasks).error($scope.displayError);
	};
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
});

appName.controller('appLinkController', function($scope, appSession){
  $scope.linkURL;
  $scope.updtAfterGenerateCode= function(data, status){
    if(data["status"] == 1)
      $scope.linkURL = data["message"];
  };
  $scope.displayError = function(data, status){
    console.log("Error");
  };
  init();
  function init(){
    appSession.GenerateQRLink().success($scope.updtAfterGenerateCode).error($scope.displayError);
  };
});