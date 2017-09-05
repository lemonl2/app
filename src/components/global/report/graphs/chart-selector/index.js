import app from 'App';
import _ from 'lodash';
import { ChartType } from 'Constant';

import './index.scss';

class ChartSelectorController {
  constructor($scope, $timeout, $state, Notifier, config) {
    const notify = new Notifier();
    this.charts = _.cloneDeep(ChartType);
    this.charts.forEach(item => item.theme = config.get('chart:defaultTheme'));
    this.services = { $scope, $timeout, $state, notify };
  }

  $onInit() {
    const { notify } = this.services;
    const chartName = sessionStorage.getItem('lastChart') || this.charts[0].name;
    try {
      this.chart = this.chart || JSON.parse(sessionStorage.getItem(chartName)) || this.charts[0];
    } catch (e) {
      notify.warning('解析图表配置项失败，已忽略');
    }
  }

  clickChart(chart) {
    const { $state, notify } = this.services;
    try {
      this.chart = JSON.parse(sessionStorage.getItem($state.$current.name + chart.name)) || chart;
    } catch (e) {
      notify.warning('解析图表配置项失败，已忽略');
    }
    sessionStorage.setItem('lastChart', $state.$current.name + chart.name);
    this.chartChange();
  }
}

ChartSelectorController.$inject = ['$scope', '$timeout', '$state', 'Notifier', 'config'];

app.component('chartSelector', {
  template: require('./index.html'),
  bindings: {
    chart: '=',
    chartChange: '&',
    popoverIsOpen: '=?',
    popoverPlacement: '@',
  },
  controller: ChartSelectorController
});
