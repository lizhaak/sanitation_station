ssApp.controller("RoutesCtrl", ["$scope", "$http", "$location", "DataFactory", "UserFactory", function($scope, $http, $location, DataFactory, UserFactory) {
  $scope.dataFactory = DataFactory;
  $scope.userFactory = UserFactory;
  $scope.routes = [];

  $scope.logoutUser = function() {
    $scope.userFactory.userLogout().then(function(response) {
      console.log('logged out');
      $location.path("/login");
    });
  };

  // $scope.isLoggedIn = function() {
  //   $scope.userFactory.userLoggedIn().then(function() {
  //     // console.log("The person logged in: ", response);
  //     // $scope.userInfo = response;
  //     $scope.userInfo = $scope.userFactory.userData();
  //     console.log("$scope.userInfo: ", $scope.userInfo);
  //   });
  // }

  $scope.dataFactory.retrieveRoutes().then(function() {
    $scope.routes = $scope.dataFactory.routesData();
    console.log('$scope.routes 1: ', $scope.routes);
  });

  // $scope.initRoutes();

  // if($scope.dataFactory.routesData() === undefined) {
  //   console.log('factory has no data, getting it now');
  //   $scope.dataFactory.retrieveRoutes().then(function() {
  //     $scope.routes = $scope.dataFactory.routesData();
  //   });
  // } else {
  //   $scope.routes = $scope.dataFactory.routesData();
  // }

}]);
