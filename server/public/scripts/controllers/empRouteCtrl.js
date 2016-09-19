ssApp.controller('EmpRouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', function($scope, $http, $location, NgMap, DataFactory) {
  console.log("EmpRouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];
  $scope.newLocation = {};
  $scope.stringLocation = "";
  $scope.vm = this;
  $scope.firstPosition = "";


  NgMap.getMap().then(function(map) {
    $scope.vm.map = map;
  });

  // employee/route/:id trashCollected link in infoWindow clicked
  $scope.vm.trashCollected = function() {
    console.log('trashCollected click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'collected';
    console.log('trash status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "Trash Collected";

    $scope.dataFactory.updateTrashStatusLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);
    });
  };

  // employee/route/:id noTrashCollected link in infoWindow clicked
  $scope.vm.noTrashCollected = function() {
    console.log('noTrashCollected click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'notCollected';
    console.log('trash status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "No Trash Collected";

    $scope.dataFactory.updateTrashStatusLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);
    });
  };

  // employee/route/:id trashCollected link in infoWindow clicked
  $scope.vm.overflowingTrash = function() {
    console.log('overflowingTrash click a link inside infoWindow');
    $scope.vm.location.icon = '/styles/brown_MarkerS.png';
    $scope.vm.location.trash_status = 'overflowing';
    console.log('status: ', $scope.vm.location.trash_status);
    $scope.vm.location.trashDisplayStatus = "Trash Overflowing";

    $scope.dataFactory.updateTrashStatusLocation($scope.vm.location).then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
      console.log("$scope.locations here maybe: ", $scope.locations);
    });
  };

  // grabs the current url and strips it down to just the end number:
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

}]);
