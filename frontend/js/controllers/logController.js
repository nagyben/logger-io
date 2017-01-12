angular.module('logger.io')
  .controller('logController', function($scope, $http, $timeout, $window) {
    $scope.width = $window.innerWidth;
    $scope.logs = [];
    $scope.newLogMessage = "";
    $scope.now = Date.now();
    $scope.tags = [
      {
        name: 'info',
        color: '#105a7a'
      },
      {
        name: 'home',
        color: '#4e713e'
      },
      {
        name: 'work',
        color: '#4e3e6b'
      },
      {
        name: 'todo',
        color: '#733434'
      }
  ];
    $scope.newTag = $scope.tags[0];

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
            $timeout(function() {
              window.scrollTo(0,document.body.scrollHeight);
            },0);
          },
          function error(response) {
            alert(response.status);
          }
        );
    };

    $scope.addMessage = function() {
      $http
        .post('/api/log', {
          tag: $scope.newTag.name,
          message: $scope.newLogMessage
        }).then(
          function success(response) {
            $scope.getMessages();
            window.scrollTo(0,document.body.scrollHeight);
            $scope.newLogMessage = "";
          },
          function error(response) {
            alert(response.status);
          }
        );
    };

    $scope.editMessage = function(message) {
      $http
      .put('/api/log/' + message._id)
      .then(
        function success(response) {
          $scope.getMessages();
        },
        function error(response) {
          alert(response.status);
        }
      );
    };

    $scope.toggleTagDropdown = function() {
      $(".dropdown-menu").toggle();
    };

    $scope.selectTag = function(tag) {
      $scope.newTag = tag;
      $(".dropdown-menu").hide();
    };

    var tick = function() {
      $scope.now = Date.now();
      $timeout(tick, 1000);
    };

    var keyDownHandler = function(e) {
      var evtobj = window.event ? event : e;
      if (evtobj.altKey) {
        $('.dropdown-menu').show();
        if (evtobj.keyCode >= 65) {
          // we have combination
          shortcutTag(evtobj.keyCode);
          $('#logInput').focus();
          return false;
        }
      }
    };

    var keyUpHandler = function(e) {
      var evtobj = window.event ? event : e;
      if (evtobj.key == "Alt") {
        // alt has been released
        $('.dropdown-menu').hide();
        $('#logInput').focus();
        return false;
      }
    };
  
    angular.element($window).bind('resize', function(){
      $scope.width = $window.innerWidth;
      // manuall $digest required as resize event
      // is outside of angular
      $scope.$digest();
    });

    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;

    $timeout(tick, 1000);

    function shortcutTag(keyCode) {
      var char = String.fromCharCode(keyCode).toLowerCase();
      for (var i = 0; i < $scope.tags.length; i++) {
        if ($scope.tags[i].name[0].toLowerCase() == char) {
          $scope.newTag = $scope.tags[i];
          $scope.$apply();
          break;
        }
      }
    }
  });
