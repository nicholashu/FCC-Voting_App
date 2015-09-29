'use strict';

angular.module('pollApp')
  .controller('PollCtrl', function($scope, $routeParams, $http, Auth) {
    var pollId = $routeParams.id;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {
    	votes: [0, 1],
    };
    $scope.voteChoice = "",
    $scope.website = "http://website.com/poll/";

    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
    });

     $scope.addVote = function(vote){

      if($scope.newThing === '') {
        return;
      }
      var voteIndex = $scope.poll.options.indexOf(vote);
      $http.patch('/api/polls/vote/' + pollId + "/" + voteIndex).
       then(function(response) {
        console.log("patched")
        $scope.poll.votes[voteIndex] = response.data.votes[voteIndex];
        $scope.poll.users_voted = response.data.users_voted;
      });
      };
  });
   
   