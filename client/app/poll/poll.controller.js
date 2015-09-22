'use strict';

angular.module('pollApp')
  .controller('PollCtrl', function($scope, $routeParams, $http, Auth) {
    var pollId = $routeParams.id;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {};
    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
    });
  });
