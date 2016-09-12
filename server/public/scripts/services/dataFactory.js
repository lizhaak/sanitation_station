ssApp.factory('DataFactory', ['$http', function($http) {
  var locations = undefined;

  var getData = function() {
    console.log('DF getting data from server!');
    var promise = $http.get("/locations").then(function(response) {
      console.log('response.data: ', response.data);
      locations = response.data;
      console.log("DF Async data response: ", locations);
    });
    return promise;
  };

  var addLocation = function(location) {
    var promise = $http.post("/locations", {location: location}).then(function(response) {
      console.log("DF post completed");
      return getData();
    });

    return promise;
  }

  // PUBLIC API object
  return {
    locationsData: function () {
      return locations;
    },
    retrieveData: function () {
      return getData();
    },
    addNewLocation: function(location) {
      return addLocation(location);
    }
  };

}]);
