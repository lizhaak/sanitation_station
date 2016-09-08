ssApp.controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("LoginCtrl works");
  $scope.user = {
    username: '',
    password: ''
  };
}]);

ssApp.run(function() {
  console.log("ssApp is ready!");
});
