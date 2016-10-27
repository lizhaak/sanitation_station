ssApp.controller("LoginCtrl", ["$scope", "$http", "$location", "UserFactory", function($scope, $http, $location, UserFactory) {
  console.log("LoginCtrl works");

  $scope.userFactory = UserFactory;

  $scope.user = {
    first_name: "",
    last_name: "",
    employee_id: "",
    username: "",
    password: "",
    user_type: "employee"
  };

  $scope.userLogin = {
    username: "",
    password: ""
  }

  $scope.login = function() {
    var user = $scope.userLogin;
      console.log('preinfo', user);
            $scope.userFactory.loginUser(user).then(function(response) {
                console.log('login complete, response: ', response);
                console.log("$$path: ", response.$$path);
                $location.path(response.$$path);

    });
  }

  $scope.registerUser = function() {
      var userWhole = $scope.user;
      console.log('register user info: ', userWhole);
      $scope.userFactory.registerUser(userWhole);
  }

  $scope.logoutUser = function() {
    $scope.userFactory.userLogout().then(function(response) {
      console.log('logged out');
      $location.path("/login");
    });
  };

}]);

ssApp.run(function() {
  console.log("ssApp is ready!");
});
