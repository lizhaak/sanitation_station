ssApp.factory('DataFactory', ['$http', function($http) {
  var locations = undefined;
  var routes = undefined;
  var route_id = "";
  var employees = undefined;


  // Get a specific Route based on the id in the url, and find the separate client's locations
  var getData = function(id) {
    console.log('DF getting data from server!', id);
    route_id = id;
    var promise = $http.get("/locations/" + route_id).then(function(response) {
      locations = response.data;
      console.log("DF Async data response: ", locations);
    });
    return promise;
  };

  // Gets distinct route numbers from DB to display back on the DOM (Route 1, Route 2, etc.)
  var getRoutes = function() {
    var promise = $http.get("/routes").then(function(response) {
      routes = response.data;
      console.log("DF Async data response: ", routes);
    });
    return promise;
  };

  // Adds new location to locations table and use route_idPOST for this specific location to redirect to specific route number page
  var addLocation = function(location) {
    var promise = $http.post("/locations", {location: location}).then(function(response) {
      console.log("response in DF: ", response);
      var route_idPOST = response.config.data.location.route_id;
      console.log("route_idPOST: ", route_idPOST);
      return getData(route_idPOST);
    });

    return promise;
  }

  // Updates icon and client status based on what the Admin clicks (active, warning, cancel)
  var updateAdminLocation = function(location) {
    var promise = $http.put("/locations", location).then(function(response) {
      console.log("response in the DF: ", response);
      var route_idPUT = response.config.data.route_id;
      console.log("response in the DF: ", route_idPUT);
      return getData(route_idPUT);
    });

    return promise;
  }


  var getEmployees = function() {
    var promise = $http.get("/employees").then(function(response) {
      console.log('employees response.data: ', response.data);
      employees = response.data;
      console.log("DF Async data response: ", routes);
    });
    return promise;
  };

  // updates trash status from the employee's changes of the icon for each location in a route
  var updateTrashStatusInLocation = function(location) {
    console.log("updateTrash location: ", location);
    var promise = $http.put("/locations/trashstatus", location).then(function(response) {
      console.log("response in the DF: ", response);
      var route_idPUT = response.config.data.route_id;
      console.log("response in the DF: ", route_idPUT);
      return getData(route_idPUT);
    });

    return promise;
  }

  // logs trash status for all locations in one route with a timestamp in trashlog table
  var logTrashStatus = function(routeID) {
    console.log("routeID in logTrashStatus: ", routeID);
    var promise = $http.post("/locations/trashlog", {routeID: routeID}).then(function(response) {
      console.log("response in DF for logTrashStatus: ", response);
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
    },
    updateLocation: function (location) {
      return updateAdminLocation(location);
    },
    employeesData: function () {
      return employees;
    },
    retrieveEmployees: function () {
        return getEmployees();
    },
    updateTrashStatusLocation: function (location) {
      return updateTrashStatusInLocation(location);
    },
    logTrashStatusForDay: function (routeID) {
      return logTrashStatus(routeID);
    }
  };

}]);
