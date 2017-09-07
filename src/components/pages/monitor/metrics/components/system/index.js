import app from 'App';
import './index.scss';
import chartJson from './json';
class MetricSystemController {
  constructor($timeout) {
    this.services = { $timeout };
  }

  onWidgetRemove(widget) {
    const { $scope } = this.services;
    $scope.$broadcast('dashboard:widgetRemoved', widget);
  }

  $onInit() {
    const { $timeout } = this.services;
    $timeout(() => {
      this.dashboard = chartJson('vm99');
    });
  }
}

MetricSystemController.$inject = ['$timeout'];

app.component('metricSystem', {
  template: require('./index.html'),
  bindings: {
    timefilter: '<',
    edit: '<',
  },
  controller: MetricSystemController
});
