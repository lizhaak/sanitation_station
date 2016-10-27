ssApp.controller("AdminEmployeesCtrl", ["$scope", "$http", "$location", "DataFactory", "UserFactory", function($scope, $http, $location, DataFactory, UserFactory) {
  console.log("AdminEmployeesCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.userFactory = UserFactory;
  $scope.employees = [];

  $scope.logoutUser = function() {
    $scope.userFactory.userLogout().then(function(response) {
      console.log('logged out');
      $location.path("/login");
    });
  };

  $scope.dataFactory.retrieveEmployees().then(function() {
    $scope.employees = $scope.dataFactory.employeesData();
    console.log('$scope.employees in admin: ', $scope.employees);
  });


}]);
