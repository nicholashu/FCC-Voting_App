'use strict';

angular.module('pollApp')
  .controller('DashboardCtrl', function ($scope, $http, socket, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {
      title: '',
      options: ['', '']
    };


    $http.get('/api/polls').success(function(poll) {
      $scope.Polls = poll;
      socket.syncUpdates('poll', $scope.Polls);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/polls', $scope.poll).
       then(function(response) {
        $scope.poll.push(response.data);
        clearPoll();
      });
    };

    function clearPoll() {
      $scope.poll = {
        name: '',
        options: ['', '']
      };
    }

    $scope.deleteThing = function(thing) {
      $http.delete('/api/polls/' + thing._id);
    };

    $scope.addOption = function() {
      $scope.poll.options.push('');
    };

     $scope.getPlaceholder = function(index) {
      switch (index) {
        case 0:
          return 'Pepsi';
        case 1:
          return 'Coca-Cola';
        default:
          return 'New Option';
      }
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
