ssApp.controller("UserCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user in userCtrl');
  $http.get("/user").then(function(response) {
    if(response.data.username) {
        // user has a current session on the server
        $scope.userName = response.data.username;
        console.log("User Data: ", $scope.userName);
    } else {
        // user has no sesssion, bounce them back to the login page
        $location.path("/login");
    }
  });

  $scope.logout = function() {
    $http.get("/user/logout").then(function(response) {
      console.log("logged out");
      $location.path("/login");
    });
  }
}]);
