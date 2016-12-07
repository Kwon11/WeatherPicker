var app = angular.module('weatherClothes', [
  'ngSanitize'
  ]);

app.service('weatherService', function() {

});

app.controller("weatherCtrl", ['$scope',
'$http', function($scope, $http, $sce) {
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
    }).then(function success(res) {//RESPONSE FROM POSTING CITY TO LINE 28 AS DEGREE
      var weatherArray = JSON.parse(res.data.body);
      return weatherArray.list[0].deg;
    }, function error(res) {
      console.log('ERROR FROM POSTING CITY')
    }).then(function (degree) { //POSTING TEMPERATURE
      $http({
        method: 'POST',
        url: '/clothes',
        headers:{
          'Content-Type': 'application/json'
        },
        data: {
          temperature: degree
        }
      }).then(function success(clothes) {//RESPONSE FROM POSTING TEMP
        console.log('post to clothes went well', clothes);
        //clothes here is the response from posting temperature
        $scope.clothesPage = clothes.data;
      }, function error(res) {
        console.log('ERROR RESPONSE FROM CLOTHES');
      })
    }, function error(res) {
      console.log('ERROR FROM POSTING TEMPERATURE')
    })
  }
}])