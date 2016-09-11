ssApp.controller('RouteCtrl', ['$scope', '$http', '$location', 'NgMap', 'DataFactory', function($scope, $http, $location, NgMap, DataFactory) {
  console.log("RouteCtrl works");
  $scope.dataFactory = DataFactory;
  $scope.locations = [];

  $scope.vm = this;

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


  if($scope.dataFactory.locationsData() === undefined) {
    console.log('factory has no data, getting it now');
    $scope.dataFactory.retrieveData().then(function() {
      $scope.locations = $scope.dataFactory.locationsData();
    });
  } else {
    $scope.locations = $scope.dataFactory.locationsData();
  }

  $scope.vm.locations = $scope.locations;
  console.log('$scope.vm.location: ', $scope.vm.locations);

  // $scope.vm.position = "[" + $scope.vm.location.latitude + "," + $scope.vm.location.longitude + "]";
  // console.log('$scope.position: ', $scope.vm.position);

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());  //put infoWindow at same point as marker
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

}]);
