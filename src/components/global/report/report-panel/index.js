import app from 'App';
import { input2cond } from 'Helpers';
import './index.scss';

class ReportPanelController {
  constructor($scope, $state, $rootScope, $timeout) {
    this.app = $rootScope.appInfo;
    this.services = { $scope, $timeout };
    this.edit = true;
  }

  $onInit() {
    const { $scope } = this.services;
    this.conditions = [];
    this.updateFilter();
    $scope.$on('chart:refresh', () => this.updateFilter());
  }

  updateFilter() {
    this.conditions.length = 0;
    if (this.inputs) {
      this.conditions.push(...this.inputs
        .filter(input => input.normal.enable && input.value)
        .map(input2cond));
    }
  }

  chartChange(type) {
    const { $scope, $timeout } = this.services;
    $timeout(() => $scope.$broadcast('chart:refresh', type));
  }
}
ReportPanelController.$inject = ['$scope', '$state', '$rootScope', '$timeout'];

app
.component('reportPanel', {
  template: require('./index.html'),
  controller: ReportPanelController,
  transclude: true,
  bindings: {
    report: '<',
    timefilter: '<',
    popoverPlacement: '@',
    allowResizable: '<',
    inputs: '<',
  },
});
