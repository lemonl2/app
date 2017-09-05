import app from 'App';
import _ from 'lodash';
import dealOption from '../services/deal-option/deal-gauge-option';
import './index.scss';

const defaultOption = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    },
    right: 20,
  },
  series: [],
};

class GaugeChartController {
  constructor($scope, SplService) {
    this.services = { $scope, SplService };
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option': {
          this.ecOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(this.ecOption, defaultOption);
          if (this.data && this.data.valueKeys.length) {
            dealOption(this.ecOption, this.data);
            //触发图标刷新
            this.services.$scope.$broadcast('echarts:refreshOption', this.ecOption);
          }
          break;
        }
        case 'data': {
          this.fetchData();
          break;
        }
      }
    });
  }

  fetchData() {
    const { SplService, $scope } = this.services;
    SplService.query(this.spl, {
      size: 1,
      start: this.timefilter[0],
      end: this.timefilter[1],
      filters: this.conditions,
    })
    .then(({data}) => {
      return this.data = data.aggs;
    }).then(data => {
      if (data.aggs.length === 0) return this.remindfulType = 'noData';
      data.result = [];
      data.keys.forEach(key => {
        if (typeof data.aggs[0][key] === 'number') data.result.push({ name: key, value: data.aggs[0][key] });
      });

      data.valueKeys.forEach(key => {
        data.result.push({name: key, value: data.aggs[0][key]});
      });

      if (data.result.length === 0) {
        return this.remindfulType = 'noMatch';
      } else {
        this.ecOption = this.option ? _.cloneDeep(this.option) : {};
        _.defaultsDeep(this.ecOption, defaultOption);
        dealOption(this.ecOption, data);
        //触发图标刷新
        $scope.$broadcast('echarts:refreshOption', this.ecOption);
      }
    });
  }
}

GaugeChartController.$inject = ['$scope', 'SplService'];

app.component('gaugeChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: GaugeChartController,
});
