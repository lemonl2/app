import app from 'App';
import { convertTimeBounds } from 'Helpers';
import './metrics';

import './index.scss';

class MonitorController {
  constructor($scope, $timeout) {
    this.services = { $scope, $timeout };
    this.selectedTime = new Date(new Date().setHours(0, 0, 0, 0));
    this.durationToCheck = [new Date().setFullYear(2010), +new Date()];
    this.timefilter = ['now-6M', 'now'];
  }

  refresh() {
    const timeBounds = convertTimeBounds(this.timefilter);
    this.durationToCheck = [timeBounds.min, timeBounds.max];
    this.selectedTime = new Date((timeBounds.min + timeBounds.max) / 2);
  }

  $onInit() {
    const { $timeout, $scope } = this.services;
    $timeout(() => {
      this.refresh();
    });
  }
}

MonitorController.$inject = ['$scope', '$timeout'];

app
.component('monitor', {
  template: require('./index.html'),
  controller: MonitorController,
})
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state({
    name: 'monitor',
    url: '/monitor',
    component: 'monitor',
  });
}]);
