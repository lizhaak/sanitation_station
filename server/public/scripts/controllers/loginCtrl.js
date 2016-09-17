ssApp.controller("LoginCtrl", ["$scope", "$http", "$location", "DataFactory", "UserFactory", function($scope, $http, $location, userLogStatus, DataFactory, UserFactory) {
  console.log("LoginCtrl works");
  // console.log("userLogStatus in LoginCtrl: ", userLogStatus);
  // $scope.whoKnows = userLogStatus;

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
  var poo = {};

  // $scope.login = function() {
  //   console.log("login function works!");
  //   if($scope.userLogin.username == "" || $scope.userLogin.password == "") {
  //     $scope.message = "Enter your username and password!";
  //   } else {
  //     console.log("sending to server...", $scope.userLogin);
  //     $http.post("/", $scope.userLogin).then(function(response) {
  //       if(response.data.username) {
  //         console.log("success: ", response.data);
  //         $scope.message = "";
  //         // location works with SPA (ng-route)
  //         console.log('redirecting to user page');
  //         var poo = response.data;
  //         console.log("poo 1: ", poo);
  //         if(response.data.user_type == "employee") {
  //           $location.path("/employee/routes");
  //         } else if (response.data.user_type == "webmaster") {
  //           $location.path("/admin/routes");
  //         }
  //       } else {
  //         console.log("failure: ", response);
  //         $scope.message = "Wrong!!";
  //       }
  //     });
  //   }
  // }

  $scope.login = function () {
    console.log("$scope.userLogin: ", $scope.userLogin);

    var string = "this is a string";

      $scope.userFactory.maybeNow(string).then(function(response) {
        console.log("login response from userFactory: ", response);

        var heyo = $scope.userFactory.ohYouKnow();
        console.log("heyo: ", heyo);
        // $scope.locations = $scope.dataFactory.locationsData();
        // console.log("$scope.locations line 114 in routeCtrl: ", $scope.locations);
        // $location.path("#/admin/routes/" + location.route_id);
      });
  }

  // $scope.login = function() {
  //   console.log("login function works!");
  //   if($scope.userLogin.username == "" || $scope.userLogin.password == "") {
  //     $scope.message = "Enter your username and password!";
  //   } else {
  //     console.log("sending to server...", $scope.userLogin);
  //     $http.post("/", $scope.userLogin).then(function(response) {
  //       if(response.data.username) {
  //         console.log("success: ", response.data);
  //         $scope.message = "";
  //         // location works with SPA (ng-route)
  //         console.log('redirecting to user page');
  //         var poo = response.data;
  //         console.log("poo 1: ", poo);
  //         if(response.data.user_type == "employee") {
  //           $location.path("/employee/routes");
  //         } else if (response.data.user_type == "webmaster") {
  //           $location.path("/admin/routes");
  //         }
  //       } else {
  //         console.log("failure: ", response);
  //         $scope.message = "Wrong!!";
  //       }
  //     });
  //   }
  // }

  var pooDa = function () {
    console.log("poo 2: ", poo);
    return poo;
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
