ssApp.controller("RouteCtrl", ["$scope", "$http", "$location", "NgMap", function($scope, $http, $location, NgMap) {
  console.log("RouteCtrl works");

  $scope.vm = this;
  NgMap.getMap().then(function(map) {
    console.log('map', map);
    $scope.vm.map = map;
  });

  $scope.vm.activateClicked = function() {
    console.log('Activate click a link inside infoWindow');
  };

  $scope.vm.warningClicked = function() {
    console.log('Warning click a link inside infoWindow');
  };

  $scope.vm.cancelClicked = function() {
    console.log('Cancel click a link inside infoWindow');
  };

  $scope.vm.locations = [
    {account_id: 1234, address: '1303 Eagle Bluff Drive', cityStateZip: 'Hastings, MN 55033', position:[44.75,-92.87]},
    {account_id: 1244, address: '1541 Test Driver', cityStateZip: 'Hastings, MN 55033', position:[44.72,-92.85]}
  ];
  $scope.vm.location = $scope.vm.locations[0];

  $scope.vm.showDetail = function(e, location) {
    $scope.vm.location = location;
    console.log('location: ', $scope.vm.location);
    console.log('location0: ', location);
    $scope.vm.map.showInfoWindow('infoWindow', this.getPosition());
  };

  $scope.vm.hideDetail = function() {
    $scope.vm.map.hideInfoWindow('infoWindow');
  };

}]);


// ssApp.run(function() {
//   console.log("ssApp is ready!");
// });
