var app = angular.module('weatherClothes', [
  //add dependancies as we go
  ]);

app.service('weatherService', function() {

});

app.controller("weatherCtrl", ['$scope',
'$http', function($scope, $http) {
  $scope.submitLocation = function() {
    console.log($scope.location);

    $http({
      method: 'POST',
      url: '/weather',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        location: $scope.location
      }
    }).then(function success(res) {
      console.log(res)
    }, function error(res) {
      console.log('FUCK NO POST TO SERVER')
    });
    //send a request to server that will
     //send a request to api for weather in this location
    //current date
    //then sends a request to storeAPI
    //render response
  }
}])