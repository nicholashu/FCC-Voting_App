'use strict';

angular.module('pollApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true,
      });
  });
