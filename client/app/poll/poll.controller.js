'use strict';

angular.module('pollApp')
  .controller('PollCtrl', function($scope, $stateParams, $http, $state, Auth) {
    var pollId = $stateParams.id;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {};

    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
      // redirect home
  
    });
  });
