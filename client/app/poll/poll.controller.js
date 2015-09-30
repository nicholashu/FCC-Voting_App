'use strict';

angular.module('pollApp')
  .controller('PollCtrl', function($scope, $routeParams, $http,$location, Auth) {
    var pollId = $routeParams.id;
    $scope.currentAddress = $location.absUrl();
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {
    	votes: [0, 1],
    };
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.voteChoice = '';

    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
    });

     $scope.addVote = function(vote){

      if($scope.poll.users_voted.indexOf($scope.getCurrentUser.name) !== -1) {
        console.log('already voted!');
        toastr.clear();
         toastr.warning('Sorry, you can only vote once...');
        return;
      }
      var voteIndex = $scope.poll.options.indexOf(vote);
      $http.patch('/api/polls/vote/' + pollId + '/' + voteIndex).
       then(function(response) {
        $scope.poll.votes[voteIndex] = response.data.votes[voteIndex];
        $scope.poll.users_voted = response.data.users_voted;
        toastr.clear();
        toastr.success('Thanks for the vote! :)');
      });
      };
  });
   
   