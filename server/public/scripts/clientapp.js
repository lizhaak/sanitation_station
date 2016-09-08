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
    when("/admin/employees", {
      templateUrl: "/views/admin/employees.html",
      controller: "AdminEmployeesCtrl"
    }).
    when("/admin/employees/:employee_id", {
      templateUrl: "/views/admin/employee.html",
      controller: "AdminIndivdualEmployeeCtrl"
    }).
    when("/admin/routes", {
      templateUrl: "/views/admin/routes.html",
      controller: "AdminRoutesCtrl"
    }).
    // when("/admin/routes/:route_id", {
    //   templateUrl: "/views/admin/route.html",
    //   controller: "RouteCtrl"
    // }).
    when("/admin/routes/1", {
      templateUrl: "/views/admin/route.html",
      controller: "RouteCtrl"
    }).
    when("/admin/routes/new_route", {
      templateUrl: "/views/admin/new_route.html",
      controller: "AdminNewRouteCtrl"
    }).
    when("/employee/:employee_id/routes", {
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
