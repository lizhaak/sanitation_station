ssApp.controller('EmpRouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', function($scope, $http, $location, NgMap, DataFactory) {
  console.log("EmpRouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];
  $scope.newLocation = {};
  $scope.stringLocation = "";
  $scope.vm = this;
  $scope.firstPosition = "";
  // $scope.trashDisplayStatus = "";


  NgMap.getMap().then(function(map) {
    $scope.vm.map = map;
  });

  $scope.vm.trashCollected = function() {
    console.log('trashCollected click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'collected';
    console.log('trash status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "Trash Collected";
  };

  $scope.vm.noTrashCollected = function() {
    console.log('noTrashCollected click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'notCollected';
    console.log('trash status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "No Trash Collected";
  };

  $scope.vm.overflowingTrash = function() {
    console.log('overflowingTrash click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'overflowing';
    console.log('status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "Trash Overflowing";
  };


  $scope.locationURL = $location.$$url;
  $scope.routeNum = $scope.locationURL.replace(/\D/g,'');
  console.log('$scope.routeNum: ', $scope.routeNum);

  $scope.dataFactory.retrieveData($scope.routeNum).then(function() {
    $scope.locations = $scope.dataFactory.locationsData();
    console.log('$scope.locations 200: ', $scope.locations);
    $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  });

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());  //put infoWindow at same point as marker
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

  $scope.objectToString = function(object){
    $scope.stringAddress = (object.address + ", " + object.city + ", " + object.state + ", " + object.zip)
    console.log('objectToString response', $scope.stringLocation);
  };

  $scope.createNewLocation = function() {
    console.log("add this new location to DB");
    $scope.objectToString($scope.newLocation);
    var string = $scope.stringAddress;
    var location = {
      location: string,
      account_id: $scope.newLocation.account_id,
      address: $scope.newLocation.address,
      city: $scope.newLocation.city,
      state: $scope.newLocation.state,
      zip: $scope.newLocation.zip,
      icon: '/styles/darkgreen_MarkerS.png',
      status: 'active',
      route_id: $scope.newLocation.route_id,
      trash_status: "",
      trashDisplayStatus: ""
    };
    console.log('our address object is: ', location);

    $http.post("/locations", location).then(function(data) {
      console.log("POST /locations", data);
    });

    $location.path("#/employee/routes/" + $scope.newLocation.route_id);
  };

}]);
