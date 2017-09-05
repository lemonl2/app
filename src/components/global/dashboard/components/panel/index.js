import app from 'App';
import { EchartsThemes } from 'Constant';

import './index.scss';

class ChartPanelController {
  constructor($scope, $timeout, SplService) {
    this.themes = EchartsThemes;
    this.services = { $scope, $timeout, SplService };
  }

  $onInit() {
    const { $scope, $timeout } = this.services;

    $scope.$on('chart:refresh', () => {
      this.setInputs();
    });
    this.inputs = [];
    this.setInputs();
    $timeout(() => $scope.$broadcast('chart:refresh', 'data'));
  }

  setInputs() {
    if (Array.isArray(this.allInputs)) {
      this.inputs.length = 0;
      this.inputs.push(...this.allInputs.filter(input => {
        // 搜索按钮没有搜索条件，忽略之
        return input.condition && input.condition.reports.includes(this.widget.detailId);
      }));
    }
  }
}

ChartPanelController.$inject = ['$scope', '$timeout', 'SplService'];

app.component('dashboardPanel', {
  template: require('./index.html'),
  bindings: {
    widget: '<',
    timefilter: '<',
    theme: '<',
    removeWidget: '&',
    allInputs: '<',
    editing: '<',
  },
  controller: ChartPanelController,
});
