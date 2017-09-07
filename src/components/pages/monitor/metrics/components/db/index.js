import app from 'App';
import './index.scss';
import chartJson from './json';
class MetricDBController {
  constructor($scope, $timeout) {
    this.services = { $scope, $timeout };
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

MetricDBController.$inject = ['$scope', '$timeout'];

app.component('metricDb', {
  template: require('./index.html'),
  bindings: {
    timefilter: '<',
    edit: '<',
  },
  controller: MetricDBController
});
