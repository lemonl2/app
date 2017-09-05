import app from 'App';
import _ from 'lodash';
import dealFunnelOption from '../services/deal-option/deal-funnel-option';
import changeFunnelOption from '../services/change-option/change-funnel-option';
import drillCommon from '../services/drill/drill-common';

import './index.scss';

const defaultOption = {
  tooltip : {
    trigger: 'item'
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true },
    },
    right: 20,
  },
  $legend: {
    data: [],
  },
  $series: {
    name: '',
    type: 'funnel',
    data: [],
  }
};

class FunnelChartController {
  constructor($rootScope, $scope, $state, $timeout, SplService, config) {
    this.services = { $rootScope, $scope, $state, $timeout, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (this.data && this.data.valueKeys.length) {
            changeFunnelOption(ecChangedOption);
            this.ecOption = ecChangedOption;
            //触发图表刷新
            this.services.$timeout(() =>{
              this.services.$scope.$broadcast('echarts:refreshOption', this.ecOption);
            });
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
    })
    .then(({ data }) => {
      return this.data = data.aggs;
    }).then(data => {
      this.remindfulType = this.reminder();
      if  (!this.remindfulType) {
        this.ecOption = this.option ? _.cloneDeep(this.option) : {};
        _.defaultsDeep(this.ecOption, defaultOption);
        if (data && data.valueKeys.length) {
          dealFunnelOption(this.ecOption, data);
          //触发图表刷新
          $scope.$broadcast('echarts:refreshOption', this.ecOption);
        }
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    let condition = drillCommon(this.data, event.name);
    SplService.explainDrill(this.spl, condition.name, condition.value).then(({data}) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  reminder() {
    if (this.data.valueKeys.length === 0) return 'noData';
    if (this.data.keys.length !== 1) return 'noMatch';
  }
}

FunnelChartController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'SplService', 'config'];

app.component('funnelChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: FunnelChartController,
});
