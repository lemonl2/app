import app from 'App';
import _ from 'lodash';
import './index.scss';
import dealBubbleOption from '../services/deal-option/deal-bubble-option';
import changeBubbleOption from '../services/change-option/change-bubble-option';

const defaultOption = {
  tooltip: {
    trigger: 'item',
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true},
    },
    right: 20,
  },
  $categoryAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  $valueAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    },
    scale: true
  },
  series: []
};

class BubbleChartController {
  constructor($rootScope, $scope, $state, SplService, config) {
    this.services = { $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (this.data && this.data.valueKeys.length) {
            changeBubbleOption(ecChangedOption, this.data);
            this.ecOption = ecChangedOption;
            this.services.$scope.$broadcast('echarts:refreshChart', this.ecOption);
          }
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
    const { SplService, $scope, config } = this.services;
    SplService.query(this.spl, {
      size: config.get('chart:maxcount'),
      start: this.timefilter[0],
      end: this.timefilter[1],
      filters: this.conditions,
      format: 'tree',
    }).then(({data}) => {
      return this.data = data.aggs;
    }).then(() => {
      this.remindfulType = this.reminder();
      this.ecOption = this.option ? _.cloneDeep(this.option) : {};
      _.defaultsDeep(this.ecOption, defaultOption);
      if (this.data && this.data.valueKeys.length) {
        dealBubbleOption(this.ecOption, this.data,);
        //触发图表刷新
        $scope.$broadcast('echarts:refreshOption', this.ecOption);
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    SplService.explainDrill(this.spl, this.data.keys[0], event.data[event.data.length - this.data.keys.length]).then(({data}) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  reminder() {
    if (this.data.valueKeys.length + this.data.keys.length < 2) return 'noMatch';
    if (this.data.keys.length < 1 || this.data.keys.length > 2) return 'noMatch';
    if (this.data.valueKeys.length) {
      if (this.data.keys.length > 2) return 'gt2D';
    }
  }
}

BubbleChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('bubbleChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: BubbleChartController,
})
