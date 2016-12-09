angular.module('logger.io')
.controller('logController', function($scope, $http, $timeout) {
  $scope.logs = [];
  $scope.newLogMessage = "";
  $scope.newTag = "INFO";
  $scope.now = Date.now();

  $scope.removeMessage = function(message) {
    $http
    .delete('/api/log/' + message._id)
    .then(
      function success(response) {
        $scope.getMessages();
      },
      function error(response) {
        alert(response.status);
      }
    );
  };

  $scope.getMessages = function() {
    $http
    .get('/api/log')
    .then(
      function success(response) {
        $scope.logs = response.data;
      },
      function error(response) {
        alert(response.status);
      }
    );
  };

  $scope.addMessage = function() {
    $http
    .post('/api/log',{
      tag: $scope.newTag,
      message: $scope.newLogMessage
    }).then(
      function success(response) {
        $scope.getMessages();
        $scope.newLogMessage = "";
      },
      function error(response) {
        alert(response.status);
      }
    );
  };

  var tick = function() {
    $scope.now = Date.now();
    $timeout(tick, 1000);
  };

  $timeout(tick, 1000);
});
