angular.module('logger.io')
  .config(function($stateProvider, $urlRouterProvider) {
    // for any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        url: '/',
        views: {
          'body': {
            templateUrl: 'parts/login_body.html'
          }
        },
        data: {
          css: 'css/login.css'
        }
      })
      .state('log', {
        url: '/log',
        views: {
          'body': {
            templateUrl: 'parts/log_body.html'
          }
        },
        data: {
          css: 'css/log.css'
        }
      });
  });
