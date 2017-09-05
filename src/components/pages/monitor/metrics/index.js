import app from 'App';

import './index.scss';

class MetricsController {
  constructor() {
    this.items = [
      {title: '系统', name: 'system'},
      {title: '数据库', name: 'db'},
      {title: '中间件', name: 'middleware'},
      {title: '网络', name: 'network'},
      {title: '存储', name: 'storage'},
    ];
    this.selectedItem = 'system';
  }
}

MetricsController.$inject = [];

app.component('metrics', {
  template: require('./index.html'),
  controller: MetricsController
});
