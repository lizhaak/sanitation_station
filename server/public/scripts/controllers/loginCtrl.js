ssApp.controller("LoginCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("LoginCtrl works");

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
    console.log("login function works!");
    if($scope.userLogin.username == "" || $scope.userLogin.password == "") {
      $scope.message = "Enter your username and password!";
    } else {
      console.log("sending to server...", $scope.userLogin);
      $http.post("/", $scope.userLogin).then(function(response) {
        if(response.data.username) {
          console.log("success: ", response.data);
          $scope.message = "";
          // location works with SPA (ng-route)
          console.log('redirecting to user page');
          if(response.data.user_type == "employee") {
            $location.path("/employee/routes");
          } else if (response.data.user_type == "webmaster") {
            $location.path("/admin/routes");
          }
        } else {
          console.log("failure: ", response);
          $scope.message = "Wrong!!";
        }
      });
    }
  }

  $scope.registerUser = function() {
    console.log("registerUser function works!");
    if($scope.user.username == "" || $scope.user.password == "") {
      $scope.message = "Choose a username and password!";
    } else {
      console.log("sending to server...", $scope.user);
      $http.post("/register", $scope.user).then(function(response) {
        console.log("success");
        $scope.message = "";
        $location.path("/login");
      },
      function(response) {
        console.log("error");
        $scope.message = "Please try again!"
      });
    }
  }
}]);

ssApp.run(function() {
  console.log("ssApp is ready!");
});
