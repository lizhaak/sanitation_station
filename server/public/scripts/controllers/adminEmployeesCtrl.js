ssApp.controller("AdminEmployeesCtrl", ["$scope", "$http", "$location", "DataFactory", function($scope, $http, $location, DataFactory) {
  console.log("AdminEmployeesCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.employees = [];

  $scope.dataFactory.retrieveEmployees().then(function() {
    $scope.employees = $scope.dataFactory.employeesData();
    console.log('$scope.employees in admin: ', $scope.employees);
  });
}]);
