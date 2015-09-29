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
      }
    $scope.website = "http://website.com/poll/"
     $scope.myPolls = [{
      title:"",
      options: ['label1', 'label2'],
      votes: [0, 1]
    }];

    getPolls()
    function blankVotes(){
      for(var i=0; i < $scope.poll.options.length; i++){
        $scope.poll.votes.push(0);
      }
    };

    function getPolls() {
      $http.get('/api/polls/user/' + $scope.getCurrentUser().name).success(function(myPolls) {
        $scope.myPolls = myPolls;
        socket.syncUpdates('myPolls', $scope.myPolls);
      });
    }

    $scope.handleClick = function(poll) {
      $window.location.href = '/polls/' + poll._id;
    };

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
      socket.unsyncUpdates('thing');
    });
  });
