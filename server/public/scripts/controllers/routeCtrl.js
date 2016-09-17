ssApp.controller('RouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', "userLogStatus", function($scope, $http, $location, NgMap, DataFactory, userLogStatus) {
  console.log("RouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];
  $scope.newLocation = {};
  $scope.stringLocation = "";
  $scope.vm = this;
  $scope.firstPosition = "";
  $scope.stringAddress = "";

  $scope.userInfo = userLogStatus;


  NgMap.getMap().then(function(map) {
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

  // $scope.init = function() {
  //   $scope.dataFactory.retrieveData().then(function() {
  //     $scope.locations = $scope.dataFactory.locationsData();
  //     $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  //   });
  // }

  // $scope.init();

  // $scope.locationTest = $scope.dataFactory.retrieveData().then(function() {
  //   $scope.locationsTest1 = $scope.dataFactory.locationsData();
  // });
  //
  // console.log('$scope.locationTest: ', $scope.locationTest);
  // console.log('$scope.locationTest1: ', $scope.locationTest1);

  console.log("$location in routeCtrl.js", $location);

  $scope.locationURL = $location.$$url;
  $scope.routeNum = $scope.locationURL.replace(/\D/g,'');
  console.log('$scope.routeNum: ', $scope.routeNum);
  //
  // if($scope.dataFactory.locationsData() === undefined) {
  //   console.log('factory has no data, getting it now');
  //   $scope.dataFactory.retrieveData($scope.routeNum).then(function() {
  //     $scope.locations = $scope.dataFactory.locationsData();
  //     console.log('$scope.locations 100: ', $scope.locations);
  //     $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  //   });
  // } else {

  console.log('$scope.location uno: ', $scope.locations);

  if($scope.routeNum !== "") {
    $scope.dataFactory.retrieveData($scope.routeNum).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log('$scope.locations 200: ', $scope.locations);
      $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
    });
  } else {
    console.log("$scope.routeNum is null, so do nothing");
  }

  console.log('$scope.location dos: ', $scope.locations);

  // if($location.url == "/admin/new_route") {
  //   $scope.dataFactory.retrieveData($scope.routeNum).then(function() {
  //     $scope.locations = $scope.dataFactory.locationsData();
  //     console.log('$scope.locations 800: ', $scope.locations);
  //     $scope.firstPosition = $scope.locations[0].latitude + "," + $scope.locations[0].longitude;
  //   });
  // }
  //
  // console.log('$scope.location tres: ', $scope.locations);

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());  //put infoWindow at same point as marker
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

  $scope.objectToString = function(object){
    $scope.stringAddress = (object.address + ", " + object.city + ", " + object.state + ", " + object.zip)
    console.log('objectToString response', $scope.stringAddress);
  };

  $scope.createNewLocation = function(location) {
    console.log("add this new location to DB");
    console.log("is this a location object?: ", location);
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

    $scope.dataFactory.addNewLocation(locationObject).then(function(response) {
      console.log("addNewLocation response: ", response);
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations line 114 in routeCtrl: ", $scope.locations);
      $location.path("#/admin/routes/" + location.route_id);
    });

  };

}]);
