ssApp.controller("RoutesCtrl", ["$scope", "$http", "$location", "DataFactory", "userFactory", function($scope, $http, $location, DataFactory, userLogStatus, userFactory) {
  console.log("RoutesCtrl works");
  // $scope.routes = [{route_num: 1}, {route_num: 2}, {route_num: 3}];

  $scope.dataFactory = DataFactory;
  // $scope.userFactory = UserFactory;
  $scope.routes = [];

  $scope.userInfo = userLogStatus;

  // $scope.isLoggedIn = function() {
  //   $scope.userFactory.userLoggedIn().then(function() {
  //     // console.log("The person logged in: ", response);
  //     // $scope.userInfo = response;
  //     $scope.userInfo = $scope.userFactory.userData();
  //     console.log("$scope.userInfo: ", $scope.userInfo);
  //   });
  // }

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

  // $scope.grabRouteID = function(id) {
  //   console.log('grabRouteID: ', id);
  //   $scope.dataFactory.retrieveData(id).then(function() {
  //     console.log('$scope is so pretty: ', $scope.dataFactory.locationsData());
  //     // $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  //     // $scope.dataFactory.retrieveRoutes().then(function() {
  //     //   $scope.routes = $scope.dataFactory.routesData();
  //     //   console.log('$scope.routes 2: ', $scope.routes);
  //     // });
  //   });
  // }

}]);
