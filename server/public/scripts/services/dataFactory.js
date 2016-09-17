ssApp.factory('DataFactory', ['$http', function($http) {
  var locations = undefined;
  var routes = undefined;
  var route_id = "";
  var routeID = "";


  var getData = function(id) {
    console.log('DF getting data from server!', id);
    route_id = id;
    var promise = $http.get("/locations/" + route_id).then(function(response) {
      console.log('locations response.data: ', response.data);
      locations = response.data;
      console.log("DF Async data response: ", locations);
    });
    return promise;
  };

  var getRoutes = function() {
    console.log('DF getting data from server for Specific Routes!');
    var promise = $http.get("/routes").then(function(response) {
      console.log('routes response.data: ', response.data);
      routes = response.data;
      console.log("DF Async data response: ", routes);
    });
    return promise;
  };

  var addLocation = function(location) {
    console.log("location in my dataFactory: ", location);
    console.log("location in my dataFactory2: ", {location: location});
    var promise = $http.post("/locations", {location: location}).then(function(response) {
      console.log("DF post completed - response: ", response);
      console.log("DF post completed - response route_id: ", response.config.data.location.route_id);
      routeID = response.config.data.location.route_id;
      return getData(routeID);
    });

    return promise;
  }

  // PUBLIC API object
  return {
    locationsData: function () {
      return locations;
    },
    retrieveData: function (id) {
      return getData(id);
    },
    addNewLocation: function(location) {
      return addLocation(location);
    },
    routesData: function () {
      return routes;
    },
    retrieveRoutes: function () {
      return getRoutes();
    }
  };

}]);
