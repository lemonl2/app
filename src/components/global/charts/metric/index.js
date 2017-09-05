import app from 'App';
import _ from 'lodash';
import './index.scss';

const defaultOption = {
  fontSize: 66,
  showTitle: true,
  unit: '',
  color: 'black',
  numberPrecision: 0,
  unitPosition: 'after',
};

class MetricChartController {
  constructor(SplService, Notifier, $scope) {
    const notify = new Notifier({
      location: '搜索',
    });
    this.services = { SplService, notify, $scope };
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          break;
        }
        case 'data' : {
          this.fetchData();
          break;
        }
      }
    });
  }

  fetchData() {
    const { SplService, notify } = this.services;
    return SplService.query(this.spl, {
      size: 1,
      start: this.timefilter[0],
      end: this.timefilter[1],
      filters: this.conditions,
    })
    .then(({ data }) => {
      if (data.aggs.length === 0) return this.remindfulType = 'noData';
      this.data = data = data.aggs;
      data.result = [];
      data.keys.forEach(key => {
        if (data.aggs[0][key] === 'number') data.result.push({ title: key, value: data.aggs[0][key] });
      });

      data.valueKeys.forEach(key => {
        data.result.push({title: key, value: data.aggs[0][key]});
      });

      if (data.result.length === 0) {
        return this.remindfulType = 'noMatch';
      } else {
        if (!this.option) this.option = {};
        _.defaultsDeep(this.option, defaultOption);
        this.series = data.result;
      }
    })
    .catch(e => notify.fuck(e));
  }
}

MetricChartController.$inject = ['SplService', 'Notifier', '$scope'];

app.component('metricChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: MetricChartController,
});
