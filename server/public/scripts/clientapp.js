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
    when("/user", {
      templateUrl: "/views/admin/employees.html",
      controller: "UserCtrl"
    }).
    when("/admin/employees", {
      templateUrl: "/views/admin/employees.html",
      controller: "AdminEmployeesCtrl"
    }).
    when("/admin/employees/:employee_id", {
      templateUrl: "/views/admin/employee.html",
      controller: "AdminEmployeesCtrl"
    }).
    when("/admin/routes", {
      templateUrl: "/views/admin/routes.html",
      controller: "RoutesCtrl"
    }).
    when("/admin/routes/:route_id", {
      templateUrl: "/views/admin/route.html",
      controller: "RouteCtrl"
    }).
    when("/admin/new_route", {
      templateUrl: "/views/admin/new_route.html",
      controller: "RouteCtrl"
    }).
    when("/admin/invoicing", {
      templateUrl: "/views/admin/employees.html",
      controller: "AdminEmployeesCtrl"
    }).
    // when("/employee/:employee_id/routes", {
    //   templateUrl: "/views/employee/routes.html",
    //   controller: "EmpRoutesCtrl"
    // }).
    when("/employee/routes", {
      templateUrl: "/views/employee/routes.html",
      controller: "EmpRoutesCtrl"
    }).
    when("/employee/:employee_id/routes/route_id", {
      templateUrl: "/views/employee/route.html",
      controller: "EmpSingleRouteCtrl"
    }).
    otherwise({
      redirectTo: "/login"
    });

}]);
