import app from 'App';
class MetricsController {
  constructor() {
    this.titles = [
      {title: '综合情况'},
      {title: '系统'},
      {title: '数据库'},
      {title: '中间件'},
    ];
  }
}

MetricsController.$inject = [];

app.component('metrics', {
  template: require('./index.html'),
  controller: MetricsController
});
