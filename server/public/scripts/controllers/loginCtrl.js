ssApp.controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("LoginCtrl works");
  $scope.user = {
    username: '',
    password: ''
  };

  $scope.login = function() {
    console.log("login function works!");
  }

  $scope.registerUser = function() {
    console.log("registerUser function works!");
  }
}]);

ssApp.run(function() {
  console.log("ssApp is ready!");
});
