ssApp.factory('DataFactory', ['$http', function($http) {
  var locations = undefined;

  var getData = function() {
    console.log('DF getting data from server!');
    var promise = $http.get("/locations").then(function(response) {
      console.log('response.data: ', response.data);
      locations = response.data;
      // return locations;
      console.log("DF Async data response: ", locations);
    });
    return promise;
  };

  return {
    locationsData: function () {
      return locations;
    }
  };

}]);
