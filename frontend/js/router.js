angular.module('logger.io')
  .config(function($stateProvider, $urlRouterProvider) {
    // for any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'static/parts/login_header.html'
          },
          'body': {
            templateUrl: 'static/parts/login_body.html'
          },
          'footer': {
            templateUrl: 'static/parts/login_footer.html'
          }
        },
        resolve: {
          $title: function() {
            return 'home';
          }
        }
      });
  });
