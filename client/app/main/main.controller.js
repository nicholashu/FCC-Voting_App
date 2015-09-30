'use strict';

angular.module('pollApp')
  .controller('MainCtrl', function ($scope, $http, socket, $window) {
  $scope.poll = {
      title: '',
      options: ['', '']
    };
$scope.website = 'http://website.com/poll/';
    $http.get('/api/polls').success(function(poll) {
      $scope.Polls = poll;
      socket.syncUpdates('poll', $scope.Polls);
    });

    $scope.handleClick = function(poll) {
      $window.location.href = '/polls/' + poll._id;
    };

  });
