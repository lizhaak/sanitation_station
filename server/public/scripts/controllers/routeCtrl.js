ssApp.controller("RouteCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
  console.log("RouteCtrl works");
  // $scope.goLocation = false;

  //  $scope.vm = this;



  // $scope.addressClicked = function (event) {
  //   console.log('a location balloon was clicked!');
  //   if($scope.goLocation === false) {
  //     $scope.goLocation = true;
  //     console.log('goLocation', $scope.goLocation);
  //   }
  // }

  // $scope.showModal = false;
  // $scope.buttonClicked = "";
  // $scope.addressClicked = function(btnClicked){
  //     $scope.buttonClicked = btnClicked;
  //     $scope.showModal = !$scope.showModal;
  // };
  initMap();

  function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: 44.75, lng: -92.87 } // north, west
        });

        var bounds = {
          north: 44.75,
          south: 44.72,
          east: -92.85,
          west: -92.87
        };

        // Display the area between the location southWest and northEast.
        map.fitBounds(bounds);

        // Add 5 markers to map at random locations.
        // For each of these markers, give them a title with their index, and when
        // they are clicked they should open an infowindow with text from a secret
        // message.
        var secretMessages = ['This', 'is', 'the', 'secret', 'message'];
        var locationObject = {
          address: "1303 Eagle Bluff Drive",
          cityStateZip: "Hastings, MN 55033",
          account_num: 1234,
          active: true,
          warning: false,
          cancel: false
        }


        var contentString = "<custom-marker>" +
                          "<div class='address'>" + locationObject.address + "</div>" +
                      "<div class='address'>" + locationObject.cityStateZip + "</div>" +
                      "<div class='accountNum'><span>Account #: </span>" + locationObject.account_num + "</div>" +
                      "<div class='customerActive'>" +
                        "<button onclick='activate()'>Activate</button>" +
                      "</div>" +
                      "<div class='customerWarn'>" +
                        "<button onclick='warning()'>Warning</button>" +
                      "</div>" +
                      "<div class='customerCancel'>" +
                        "<button onclick='cancel()'>Cancel</button>" +
                      "</div>" +
                    "</div>" +
                    "</custom-marker>";

        var lngSpan = [-92.87, -92.85];
        var latSpan = [44.75, 44.72];
        for (var i = 0; i < lngSpan.length; ++i) {
          var marker = new google.maps.Marker({
            position: {
              lat: latSpan[i],
              lng: lngSpan[i]
            },
            map: map,
            icon: '/styles/darkgreen_MarkerS.png'
          });
          attachLocationOptions(marker, contentString);
        }
      }

      // Attaches an info window to a marker with the provided message. When the
      // marker is clicked, the info window will open with the secret message.
      function attachLocationOptions(marker, contentString) {
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('click', function() {
          infowindow.open(marker.get('map'), marker);
        });
      }

      // $scope.activate = function () {
      //   console.log('activate button was clicked!');
      // }

      function activate() {
        console.log('activate button was clicked!');
      }

      $scope.warning = function () {
        console.log('warning button was clicked!');
      }

      $scope.cancel = function () {
        console.log('cancel button was clicked!');
      }

}]);
