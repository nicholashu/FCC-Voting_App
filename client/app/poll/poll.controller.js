'use strict';

angular.module('pollApp')
  .controller('PollCtrl', function($scope, $routeParams, $http, Auth) {
    var pollId = $routeParams.id;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.poll = {
    	votes: [0, 1],
    };
    $scope.website = "http://website.com/poll/";

    $http.get('/api/polls/' + pollId).success(function(poll) {
      $scope.poll = poll;
    }).error(function(err) {
      console.log(err);
    });

     $scope.addVote = function(vote){
      //var optionIndex = poll.options.indexOf(vote); 
      // $http.post('/api/polls' + $scope.poll.id).
     //  then(function(response) {
      //  $scope.poll.votes.push(response.data);
 // };
      

      };
  });
   
   