angular.module('logger.io')
  .controller('registerController', function($scope, $http, $window, $state, notificationService) {
    $scope.email = "";
    $scope.password = "";
    $scope.confirmPassword = "";

    $scope.register = function() {
      // check if passwords match
      if ($scope.email && $scope.password) {
        if ($scope.password == $scope.confirmPassword) {
          $http.post("/api/user", {
              email: $scope.email,
              password: $scope.password
            })
            .then(
              function success(response) {
                if (response.status == 200) {
                  notificationService('Account created', 'success');
                  $state.go('login');
                } else {
                  notificationService(response.data.message, 'error');
                }
              },
              function error(response) {}
            )
        } else {
          notificationService("Passwords do not match", "error");
        }
      } else {
        notificationService("Email cannot be empty", "error");
      }

    };
  });
