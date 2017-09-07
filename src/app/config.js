import app from 'App';
import { GlobalApp } from 'Constant';

app
//.config(['$compileProvider', $compileProvider => {
  // $compileProvider.commentDirectivesEnabled(false);
  // $compileProvider.cssClassDirectivesEnabled(false);
//}])
.config(['$locationProvider', $locationProvider => $locationProvider.html5Mode(true)])
.config(['$httpProvider', $httpProvider => {
  // $httpProvider.interceptors.push(['$q', '$state', '$rootScope', '$location', ($q, $state, $rootScope, $location) => {
  //   $rootScope.loading = 0;

  //   return {
  //     request(config) {
  //       ++$rootScope.loading;
  //     },
  //     requestError(err) {
  //       --$rootScope.loading;
  //       return $q.reject(err);
  //     },
  //     response(res) {
  //       --$rootScope.loading;
  //       return res;
  //     },
  //     responseError(err) {
  //       --$rootScope.loading;
  //       return $q.reject(err);
  //     }
  //   };
  // }]);
}])
.run(['$transitions', '$rootScope', '$location', ($transitions, $rootScope, $location) => {
  if ($location.search().embed) {
    $rootScope.embed = true;
    document.documentElement.classList.add('embed');
  }
}])
.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])
.config(['$sceProvider', function ($sceProvider) {
  $sceProvider.enabled(false);
}])
.config(['$uibModalProvider', function ($uibModalProvider) {
  $uibModalProvider.options = {
    backdrop: 'static',
  };
}]);
