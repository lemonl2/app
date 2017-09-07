import 'font-awesome/scss/font-awesome.scss';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import 'angular-i18n/zh-cn';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';

import angularLoadingBar from 'angular-loading-bar';
import 'angular-loading-bar/build/loading-bar.css';

import './bootstrap';

import './base.scss';
import './icons.scss';
import './Dosis.scss';
import './global.scss';

import moment from 'moment';
moment.locale('zh-cn');

import 'echarts';

import 'angular-resizable';
import 'angular-resizable/src/angular-resizable.css';

// import 'Images/favicon.ico';

import 'angular-gridster';
import 'angular-gridster/dist/angular-gridster.css';

require('smoothscroll-polyfill').polyfill();

export default angular.module('app', [
  ngAnimate,
  uiRouter,
  uiBootstrap,
  angularLoadingBar,
  'gridster',
  'angularResizable',
]);
