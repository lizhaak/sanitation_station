ssApp.controller("RoutesCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("RoutesCtrl works");
  $scope.routes = [{route_num: 1}, {route_num: 2}, {route_num: 3}];

  // $scope.locationURL = '/#/admin/routes/' +

}]);
