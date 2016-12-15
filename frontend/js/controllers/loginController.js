angular.module('logger.io')
  .controller('loginController', function($scope, $http, $window, $state, notificationService) {
    $scope.email = "";
    $scope.password = "";

    $scope.login = function() {
      $http
        .post("/api/user/auth", {
          email: $scope.email,
          password: $scope.password
        })
        .then(
          function success(response) {
            if (response.status == 200) {
              console.log(response.data.token);
              $window.sessionStorage.token = response.data.token;
              $.noty.closeAll();
              $state.go('log');
            } else if (response.status == 401) {
              // incorrect username or password
              notificationService("incorrect username or password", "error");
            } else {
              // server down?
              notificationService("Error " + status, "warning");
            }
          },
          function error(data, status, headers, config) {
            notificationService("Error " + status);
            delete $window.sessionStorage.token;
          }
        );
    };
  });
