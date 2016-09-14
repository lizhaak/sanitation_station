ssApp.factory('UserFactory', ['$http', function($http) {
  console.log('checking if user is logged in UserFactory');

  var user = "";

  var loggedIn = function() {
    var promise = $http.get("/user").then(function(response) {
      if(response.data.username) {
          // user has a current session on the server
          // $scope.userName = response.data.username;
          user = response.data;
          console.log("User Data in UserFactory: ", user);
      } else {
          // user has no sesssion, bounce them back to the login page
          // $location.path("/login");
          console.log("User not logged in from UserFactory");
          user = "notLoggedIn";
        }
      });
  }

  var logout = function() {
    var promise = $http.get("/user/logout").then(function(response) {
      console.log("logged out");
      // $location.path("/login");
    });
  }

  return {
    user: user,
    userLoggedIn: function() {
      return loggedIn();
    },
    userLogout: function() {
      return logout();
    }
  }

});
