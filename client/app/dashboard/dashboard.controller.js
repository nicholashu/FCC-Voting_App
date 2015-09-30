'use strict';

angular.module('pollApp')
  .controller('DashboardCtrl', function ($scope, $http, $window, socket, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.poll = {
      author: $scope.getCurrentUser().name,
      title: '',
      options: ['', ''],
      votes: [0,0],
      };
    $scope.tab = 1;
    $scope.website = 'http://website.com/poll/';
     $scope.myPolls = [{
      title:'',
      options: ['label1', 'label2'],
      votes: [0, 1]
    }];

 


    function getPolls() {
      $http.get('/api/polls/user/' + $scope.getCurrentUser().name).success(function(myPolls) {
        $scope.myPolls = myPolls;
        socket.syncUpdates('myPolls', $scope.myPolls);
      });
    }
   getPolls();
     function clearPoll() {
      $scope.poll = {
        author: $scope.getCurrentUser().name,
        name: '',
        options: ['', ''],
        votes: [0,0],
      };
    }

    $scope.handleClick = function(poll) {
      $window.location.href = '/polls/' + poll._id;
    };

    $scope.setTab = function(tab) {
      $scope.tab = tab;
    };

    $scope.isTab = function(tab) {
      return tab === $scope.tab;
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/polls', $scope.poll).
       then(function(response) {
        $scope.poll.push(response.data);
      });
        clearPoll();
        getPolls();
        $scope.tab = 2;
        toastr.success('New poll added :)');
    };


    $scope.deleteThing = function(thing) {
      $http.delete('/api/polls/' + thing._id);
      getPolls();
      toastr.error('Poll Deleted');
    };

    $scope.addOption = function() {
      $scope.poll.options.push('');
      $scope.poll.votes.push(0);
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
      socket.unsyncUpdates('poll');
    });
  });
