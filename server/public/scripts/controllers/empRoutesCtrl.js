ssApp.controller("EmpRoutesCtrl", ["$scope", "$http", "$location", "DataFactory", "UserFactory", function($scope, $http, $location, DataFactory, UserFactory) {
  $scope.dataFactory = DataFactory;
  $scope.userFactory = UserFactory;
  $scope.routes = [];

  $scope.logoutUser = function() {
    $scope.userFactory.userLogout().then(function(response) {
      console.log('logged out');
      $location.path("/login");
    });
  };

  $scope.initRoutes = function() {
    $scope.dataFactory.retrieveRoutes().then(function() {
      $scope.routes = $scope.dataFactory.routesData();
    });
  }

  $scope.initRoutes();

  if($scope.dataFactory.routesData() === undefined) {
    console.log('factory has no data, getting it now');
    $scope.dataFactory.retrieveRoutes().then(function() {
      $scope.routes = $scope.dataFactory.routesData();
    });
  } else {
    $scope.routes = $scope.dataFactory.routesData();
  }

}]);
