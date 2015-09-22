'use strict';

angular.module('pollApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:id', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });
