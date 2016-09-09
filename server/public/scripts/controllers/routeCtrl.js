ssApp.controller("RouteCtrl", ["$scope", "$http", "$location", "NgMap", function($scope, $http, $location, NgMap) {
  console.log("RouteCtrl works");

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

  $scope.vm.locations = [
    {account_id: 1234, address: '1303 Eagle Bluff Drive', cityStateZip: 'Hastings, MN 55033', position:[44.75,-92.87], icon: '/styles/darkgreen_MarkerS.png', status: 'active'},
    {account_id: 1244, address: '1541 Test Driver', cityStateZip: 'Hastings, MN 55033', position:[44.72,-92.85], icon: '/styles/darkgreen_MarkerS.png', status: 'active'}
  ];
  $scope.vm.location = $scope.vm.locations[0];

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());  //put infoWindow at same point as marker
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

}]);
