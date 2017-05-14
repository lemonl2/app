import angular from 'angular';
import 'font-awesome/scss/font-awesome.scss';
import ngAnimate from 'angular-animate';
import 'angular-i18n/zh-cn';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';

import angularLoadingBar from 'angular-loading-bar';
import 'angular-loading-bar/build/loading-bar.css';

import './base.scss';
import './Dosis.scss';
//import 'Images/favicon.ico';

moment.locale('zh-cn');

export default angular.module('app', [
  ngAnimate,
  uiRouter,
  uiBootstrap,
  angularLoadingBar,
]);
