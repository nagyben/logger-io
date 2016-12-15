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
          },
          'header': {
            templateUrl: 'parts/header.html'
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
          },
          'header': {
            templateUrl: 'parts/header.html'
          }
        },
        data: {
          css: 'css/log.css'
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'body': {
            templateUrl: 'parts/register_body.html'
          },
          'header': {
            templateUrl: 'parts/header.html'
          }
        },
        data: {
          css: 'css/log.css'
        }
      });
  });
