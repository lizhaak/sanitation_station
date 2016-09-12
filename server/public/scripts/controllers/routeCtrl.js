ssApp.controller('RouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', function($scope, $http, $location, NgMap, DataFactory) {
  console.log("RouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];
  $scope.newLocation = {};
  $scope.stringLocation = "";
  $scope.vm = this;
  $scope.firstPosition = "";

  NgMap.getMap().then(function(map) {
    console.log('map', map);
    $scope.vm.map = map;
  });

  $scope.vm.activateClicked = function() {
    console.log('Activate click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/darkgreen_MarkerS.png';
    $scope.vm.location.status = 'active';
    console.log('status: ', $scope.vm.location.status);
  };

  $scope.vm.warningClicked = function() {
    console.log('Warning click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/orange_MarkerS.png';
    $scope.vm.location.status = 'warning';
    console.log('status: ', $scope.vm.location.status);
  };

  $scope.vm.cancelClicked = function() {
    console.log('Cancel click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/paleblue_MarkerS.png';
    $scope.vm.location.status = 'cancel';
    console.log('status: ', $scope.vm.location.status);
  };

  $scope.init = function() {
    $scope.dataFactory.retrieveData().then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
    });
  }

  $scope.init();

  if($scope.dataFactory.locationsData() === undefined) {
    console.log('factory has no data, getting it now');
    $scope.dataFactory.retrieveData().then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
    });
  } else {
    $scope.locations = $scope.dataFactory.locationsData();
    $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  }

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());  //put infoWindow at same point as marker
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

  $scope.objectToString = function(object){
    console.log("within objectToString", $scope.stringLocation)
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
      route_id: $scope.newLocation.route_id
    };
    console.log('our address object is: ', location);

    $http.post("/locations", location).then(function(data) {
      console.log("POST /locations", data);
      $scope.init();
    });
  };

}]);
