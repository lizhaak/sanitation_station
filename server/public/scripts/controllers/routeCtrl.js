ssApp.controller('RouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', function($scope, $http, $location, NgMap, DataFactory) {
  console.log("RouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];
  $scope.newLocation = {};
  $scope.stringLocation = "";
  $scope.vm = this;
  $scope.firstPosition = "";


  NgMap.getMap().then(function(map) {
    $scope.vm.map = map;
  });

  $scope.vm.activateClicked = function() {
    console.log('Activate click a link inside infoWindow');
    console.log("Activate $scope.vm.location: ", $scope.vm.location);
    $scope.vm.location.icon = '/styles/darkgreen_MarkerS.png';
    $scope.vm.location.status = 'active';
    console.log('status: ', $scope.vm.location.status);

    $scope.dataFactory.updateLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);

    });
  };

  $scope.vm.warningClicked = function() {
    console.log('Warning click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/orange_MarkerS.png';
    $scope.vm.location.status = 'warning';
    console.log('status: ', $scope.vm.location.status);
    $scope.dataFactory.updateLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);
    });
  };

  $scope.vm.cancelClicked = function() {
    console.log('Cancel click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/paleblue_MarkerS.png';
    $scope.vm.location.status = 'cancel';
    console.log('status: ', $scope.vm.location.status);
    $scope.dataFactory.updateLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);
    });
  };

  // grabs the current url and strips it down to just the end number:
  $scope.locationURL = $location.$$url;
  $scope.routeNum = $scope.locationURL.replace(/\D/g,'');
  console.log('$scope.routeNum: ', $scope.routeNum);

  // Do not try to retrieve locations data if not currently on a specific route page
  if($scope.routeNum == "") {
    console.log("do not try to retrieve locations data");
  } else {
    $scope.dataFactory.retrieveData($scope.routeNum).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log('$scope.locations 200: ', $scope.locations);
      $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
    });
  }

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

  $scope.createNewLocation = function(location) {
    $scope.objectToString(location);
    var string = $scope.stringAddress;
    var locationObject = {
      location: string,
      account_id: location.account_id,
      address: location.address,
      city: location.city,
      state: location.state,
      zip: location.zip,
      icon: '/styles/darkgreen_MarkerS.png',
      status: 'active',
      route_id: location.route_id,
      trash_status: "",
      trashDisplayStatus: ""
    };
    console.log('our address object is: ', locationObject);

    $scope.dataFactory.addNewLocation(locationObject).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      // $location.path("/admin/routes/" + locationObject.route_id);
      $location.path("/admin/routes/");
  });

};

}]);
