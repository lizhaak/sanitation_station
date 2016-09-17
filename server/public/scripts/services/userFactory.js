ssApp.factory('UserFactory', ['$http', function($http) {
  console.log('checking if user is logged in UserFactory');
  // console.log("userLogStatus", userLogStatus);
  // var youKnow = userLogStatus;

  var user = "";

  var boo = {};

  var loginStuff = function() {
    console.log("login function works in userFactory.js!");
    if(userLogin.username == "" || userLogin.password == "") {
      // $scope.message = "Enter your username and password!";
      console.log("Enter your username and password!");
    } else {
      console.log("sending to server...", userLogin);
      $http.post("/", userLogin).then(function(response) {
        if(response.data.username) {
          console.log("success: ", response.data);
          // $scope.message = "";
          // location works with SPA (ng-route)
          boo = response.data;
          console.log("boo duh: ", boo);
          console.log('redirecting to user page');
          if(response.data.user_type == "employee") {
            $location.path("/employee/routes");
          } else if (response.data.user_type == "webmaster") {
            $location.path("/admin/routes");
          }
        } else {
          console.log("failure: ", response);
          // $scope.message = "Wrong!!";
        }

        return promise;
      });

    }

  }


  var loggedIn = function() {
    var promise = $http.get("/user").then(function(response) {
      if(response.data.username) {
          // user has a current session on the server
          // $scope.userName = response.data.username;
          user = response.data;
          console.log("User Data in UserFactory: ", user);
          // return user;
      } else {
          // user has no sesssion, bounce them back to the login page
          // $location.path("/login");
          console.log("User not logged in from UserFactory");
          user = "notLoggedIn";
          // return user = "notLoggedIn";
        }
      });
    return promise;
  }

  var logout = function() {
    var promise = $http.get("/user/logout").then(function(response) {
      console.log("logged out");
      // $location.path("/login");
    });
  return promise;
  }


  return {
    userData: function() {
      return user;
    },
    userLoggedIn: function() {
      return loggedIn();
    },
    userLogout: function() {
      return logout();
    },
    ohYouKnow: function () {
      return boo;
    },
    maybeNow: function () {
      return loginStuff();
    }
  };

}]);

// user: user,
// userLoggedIn: function() {
//   return loggedIn();
// },
