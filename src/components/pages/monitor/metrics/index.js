import app from 'App';
import './components';

import './index.scss';

class MetricsController {
  constructor($scope, $timeout) {
    this.items = [
      {title: '系统', name: 'metric-system'},
      {title: '数据库', name: 'metric-db'},
      {title: '中间件', name: 'metric-middleware'},
      {title: '网络', name: 'metric-network'},
      {title: '存储', name: 'metric-storage'},
    ];
    this.activeSection = { name: 'metric-system' };

    this.services = {$scope, $timeout};
  }

  $onInit() {

  }
}

MetricsController.$inject = ['$scope', '$timeout'];

app.component('metrics', {
  template: require('./index.html'),
  bindings: {
    timefilter: '<',
    edit: '<',
  },
  controller: MetricsController
});
