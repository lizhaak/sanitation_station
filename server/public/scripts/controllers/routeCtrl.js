ssApp.controller("RouteCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("RouteCtrl works");

  $scope.activate = function () {
    console.log('activate button was clicked!');
  }

  $scope.warning = function () {
    console.log('warning button was clicked!');
  }

  $scope.cancel = function () {
    console.log('cancel button was clicked!');
  }

}]);


// ssApp.run(function() {
//   console.log("ssApp is ready!");
// });
