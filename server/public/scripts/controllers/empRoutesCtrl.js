ssApp.controller("EmpRoutesCtrl", ["$scope", "$http", "$location", "DataFactory", function($scope, $http, $location, DataFactory) {
  $scope.dataFactory = DataFactory;
  $scope.routes = [];

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
