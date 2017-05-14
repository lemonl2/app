import app from 'App';

app
.config(['$locationProvider', $locationProvider => $locationProvider.html5Mode(true)])
.config(['$httpProvider', $httpProvider => {
  $httpProvider.interceptors.push(['$q', '$state', '$rootScope', ($q, $state, $rootScope) => {

    return {
      request(config) {
      },
      requestError(err) {
      },
      response(res) {
      },
      responseError(err) {
      }
    };
  }]);
}])
.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])
.config(['$sceProvider', function ($sceProvider) {
  $sceProvider.enabled(false);
}]);
