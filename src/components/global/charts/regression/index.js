import app from 'App';
import _ from 'lodash';
import dealRegressionOption from '../services/deal-option/deal-regression-option';
import changeRegressionOption from '../services/change-option/change-regression-option';
import './index.scss';

const defaultOption = {
  tooltip: {
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
    right: 20,
  },
  $xAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    nameTextStyle: {
      fontFamily: 'Dosis'
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
  },
  $yAxis: {
    type: 'value',
    min: 1.5,
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    nameTextStyle: {
      fontFamily: 'Dosis'
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
  },
  $series: [],
};

class RegressionChartController {
  constructor($rootScope, $scope, $state, SplService, Notifier, config) {
    this.notify = new Notifier({
      location: '搜索',
    });
    this.services = { $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (!dealRegressionOption(ecChangedOption, this.data)) {
            this.notify.warning('解析回归函数失败');
          }
          this.ecOption = ecChangedOption;
          //触发图表刷新
          this.services.$scope.$broadcast('echarts:refreshOption', this.ecOption);
          break;
        }
        case 'data' : {
          this.fetchData();
          break;
        }
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    SplService.explainDrill(this.spl, this.data.keyName, event.data[0]).then(({ data }) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  fetchData() {
    const { $scope, SplService, config } = this.services;
    this.ecOption = this.option ? _.cloneDeep(this.option) : {};
    _.defaultsDeep(this.ecOption, defaultOption);

    SplService.query(this.spl, {
      size: config.get('chart:maxcount'),
      start: this.timefilter[0],
      end: this.timefilter[1],
      filters: this.conditions,
    }).then(({ data }) => {
      if (data.aggs.keys.length !== 1 || data.aggs.valueKeys.length !== 1) {
        throw new TypeError('不支持的图表类型，本图表只支持二维数据表');
      }
      return {
        data: data.aggs.aggs.map(agg => [
          agg[data.aggs.keys[0]],
          agg[data.aggs.valueKeys[0]],
        ]),
        keyName: data.aggs.keys[0],
        valueKeyName: data.aggs.valueKeys[0],
      };
    }).then(data => {
      this.data = data;
      if (!dealRegressionOption(this.ecOption, this.data)) {
        this.notify.warning('解析回归函数失败');
      }
      this.reminderMessage = null;
      $scope.$broadcast('echarts:refreshOption', this.ecOption);
    }).catch(e => {
      this.reminderMessage = e.message;
    });
  }
}

RegressionChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'Notifier', 'config'];

app.component('regressionChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: RegressionChartController,
});
