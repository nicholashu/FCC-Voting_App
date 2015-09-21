'use strict';

angular.module('pollApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  $scope.poll = {
      title: '',
      options: ['', '']
    };

    $http.get('/api/polls').success(function(poll) {
      $scope.Polls = poll;
      socket.syncUpdates('poll', $scope.Polls);
    });

  });
