angular.module('logger.io')

.factory('authInterceptor', function($q, $rootScope, $window, $injector, notificationService) {
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.authorization = 'JWT ' + $window.sessionStorage.token;
			}
			return config;
		},
		response: function(response) {
      // do something on success
			if (response.data.message) {
				notificationService(response.data.message, response.data.messageType, response.data.messageTimeout);
			}
      return response;
    },
		responseError: function(response) {
			if (response.data.message) {
				notificationService(response.data.message, response.data.messageType, response.data.messageTimeout);
			}
			if (response.status === 401) {
				stateService = $injector.get('$state');
				stateService.go('login');
			}
			return response || $q.when(response);
		}
	};
});

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
});
