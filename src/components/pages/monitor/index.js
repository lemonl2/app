import app from 'App';
import ResizeObserver from 'resize-observer-polyfill';
import { convertTimeBounds } from 'Helpers';
import './metrics';
import './setting';

import './index.scss';

class MonitorController {
  constructor($scope, $timeout, $state, config) {
    this.services = { $scope, $timeout };
    this.selectedTime = new Date(new Date().setHours(0, 0, 0, 0));
    this.durationToCheck = ['请选择', '请选择'];
    this.timefilter = [config.get('timefilter:start'), config.get('timefilter:end')];
    this.showTimeline = true;
    this.edit = $state.params.edit ? ($state.params.edit | 0) : true;
  }

  refresh() {
    const { $scope, $timeout } = this.services;
    this.showTimeline = false;
    const timeBounds = convertTimeBounds(this.timefilter);
    this.durationToCheck = [timeBounds.min, timeBounds.max];
    this.selectedTime = new Date((timeBounds.min + timeBounds.max) / 2);
    $timeout(()=> { this.showTimeline = true;});
  }

  timeChange() {
    const { $scope, $timeout } = this.services;
    $timeout(() => {
      $scope.$broadcast('chart:refresh', 'data');
    }, 500);
  }

  $onInit() {
    const { $timeout, $scope } = this.services;
    this.refresh();

    const ro = new ResizeObserver(([ entry ]) => {
      this.showTimeline = false;
      $timeout(()=> { this.showTimeline = true;}, 300);
    });
    const timer = document.querySelector('#time-bar');
    ro.observe(timer);
  }
}

MonitorController.$inject = ['$scope', '$timeout', '$state', 'config'];

app
.component('monitor', {
  template: require('./index.html'),
  controller: MonitorController,
})
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider.state({
    name: 'monitor',
    url: '/monitor?edit&embed',
    component: 'monitor',
  });
}]);
