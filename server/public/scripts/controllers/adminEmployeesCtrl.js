ssApp.controller("AdminEmployeesCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("AdminEmployeesCtrl works");
  
  $scope.employees = [{employee_id: 1}, {employee_id: 2}, {employee_id: 3}];
}]);
