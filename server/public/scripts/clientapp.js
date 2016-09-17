var ssApp = angular.module("ssApp", ["ngRoute", "ngMaterial", "ngMap"]);

ssApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when("/login", {
      templateUrl: "/views/login.html",
      controller: "LoginCtrl"
    }).
    when("/register", {
      templateUrl: "/views/register.html",
      controller: "LoginCtrl"
    }).
    // when("/user", {
    //   templateUrl: "/views/admin/employees.html",
    //   controller: "UserCtrl"
    // }).
    when("/admin/employees", {
      templateUrl: "/views/admin/employees.html",
      controller: "AdminEmployeesCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", function(UserFactory, $location){
            return UserFactory.userLoggedIn().then(function(response) {
              // userInfo = UserFactory.userData();
              console.log("clientApp response: ", response.data);
              // console.log("userInfo in clientApp call: ", userInfo);
              userInfo = response.data;
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userInfo;
            });
          }]
      }
    }).
    when("/admin/employees/:employee_id", {
      templateUrl: "/views/admin/employee.html",
      controller: "AdminEmployeesCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", function(UserFactory, $location){
            return UserFactory.userLoggedIn().then(function() {
              userInfo = UserFactory.userData();
              console.log("userInfo in clientApp call: ", userInfo);
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userInfo;
            });
          }]
      }
    }).
    when("/admin/routes", {
      templateUrl: "/views/admin/routes.html",
      controller: "RoutesCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", "LoginCtrl", function(UserFactory, $location, LoginCtrl){
            var userLogin = LoginCtrl.pooDa();
            console.log("userLogin you there?", userLogin);
            return UserFactory.login().then(function(response) {
              // userInfo = UserFactory.userData();
              console.log("clientApp response: ", response);
              // console.log("userInfo in clientApp call: ", userInfo);
              userInfo = response;
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userLogin;
            });
          }]
      }
    }).
    when("/admin/routes/:route_id", {
      templateUrl: "/views/admin/route.html",
      controller: "RouteCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", function(UserFactory, $location){
            return UserFactory.userLoggedIn().then(function(response) {
              // userInfo = UserFactory.userData();
              console.log("clientApp response: ", response);
              // console.log("userInfo in clientApp call: ", userInfo);
              userInfo = response;
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userInfo;
            });
          }]
      }
    }).
    when("/admin/new_route", {
      templateUrl: "/views/admin/new_route.html",
      controller: "RouteCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", function(UserFactory, $location){
            return UserFactory.userLoggedIn().then(function(response) {
              // userInfo = UserFactory.userData();
              console.log("clientApp response: ", response);
              // console.log("userInfo in clientApp call: ", userInfo);
              userInfo = response;
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userInfo;
            });
          }]
      }
    }).
    when("/admin/invoicing", {
      templateUrl: "/views/admin/employees.html",
      controller: "AdminEmployeesCtrl",
      resolve: {
          userLogStatus: ["UserFactory", "$location", function(UserFactory, $location){
            return UserFactory.userLoggedIn().then(function() {
              userInfo = UserFactory.userData();
              console.log("userInfo in clientApp call: ", userInfo);
              console.log("userInfo.user_type in clientApp call: ", userInfo.user_type);
              // return userInfo;
              if (userInfo.user_type === "employee" || userInfo.user_type === "" || userInfo.user_type === undefined) {
                $location.path("/login");
              }
              return userInfo;
            });
          }]
      }
    }).
    // when("/employee/:employee_id/routes", {              //*/ Use when I figure out how to show routes based on individual Employee /*//
    //   templateUrl: "/views/employee/routes.html",
    //   controller: "EmpRoutesCtrl"
    // }).
    when("/employee/routes", {
      templateUrl: "/views/employee/routes.html",
      controller: "EmpRoutesCtrl"
    }).
    // when("/employee/:employee_id/routes/route_id", {     //*/ Use when I figure out how to show routes based on individual Employee /*//
    //   templateUrl: "/views/employee/route.html",
    //   controller: "EmpSingleRouteCtrl"
    // }).
    when("/employee/routes/:route_id", {
      templateUrl: "/views/employee/route.html",
      controller: "EmpRouteCtrl"
    }).
    otherwise({
      redirectTo: "/login"
    });

}]);
