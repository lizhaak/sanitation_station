ssApp.controller("EmpRoutesCtrl", ["$scope", "$http", "$location", "DataFactory", function($scope, $http, $location, DataFactory) {
  console.log("EmpRoutesCtrl works");
  // $scope.routes = [{route_id: 1}, {route_id: 2}, {route_id: 3}];
  $scope.dataFactory = DataFactory;
  $scope.routes = [];

  $scope.initRoutes = function() {
    $scope.dataFactory.retrieveRoutes().then(function() {
      $scope.routes = $scope.dataFactory.routesData();
      console.log('$scope.routes 1: ', $scope.routes);
    });
  }

  $scope.initRoutes();

  if($scope.dataFactory.routesData() === undefined) {
    console.log('factory has no data, getting it now');
    $scope.dataFactory.retrieveRoutes().then(function() {
      $scope.routes = $scope.dataFactory.routesData();
      console.log('$scope.routes 2: ', $scope.routes);
    });
  } else {
    $scope.routes = $scope.dataFactory.routesData();
    console.log('$scope.routes 3: ', $scope.routes);
  }

}]);