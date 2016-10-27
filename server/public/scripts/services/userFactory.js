ssApp.factory('UserFactory', ['$http', '$location', function($http, $location) {

  var loggedIn = function(user) {
    var promise = $http.post("/", user).then(function(response) {
      console.log("response login: ", response);
      if(response.data.username) {
          // user has a current session on the server
          if(response.data.user_type == "employee") {
            return $location.path("/employee/routes");
          } else if (response.data.user_type == "webmaster"){
            return $location.path("/admin/routes");
          }
      } else {
          console.log("User not logged in from UserFactory");
          return false;
        }
      });
    return promise;
  }

  var logout = function() {
    var promise = $http.get("/user/logout").then(function(response) {
      console.log("logged out");
      return true;
    });
  return promise;
  }

  var registeringUser = function(user) {
      console.log('sending to server...', user);
      var promise = $http.post('/register', user).then(function(response) {
        console.log('success');
        $location.path('/login');
      },
      function(response) {
        console.log('error');
        message = "Please try again."
      });
    return promise;
    }

  return {
    loginUser: function(user) {
      return loggedIn(user);
    },
    userLogout: function() {
      return logout();
    },
    registerUser: function(user) {
      return registeringUser(user);
    }
  }

}]);

// user: user,
// userLoggedIn: function() {
//   return loggedIn();
// },
