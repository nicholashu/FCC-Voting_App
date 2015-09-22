'use strict';

angular.module('pollApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/polls/:id', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });