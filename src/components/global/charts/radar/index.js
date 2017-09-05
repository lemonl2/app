import app from 'App';
import _ from 'lodash';
import dealRadarOption from '../services/deal-option/deal-radar-option';
import changeRadarOption from '../services/change-option/change-radar-option';
import drillCommon from '../services/drill/drill-common';

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
  $radar: {
    splitNumber: 4,
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(255, 255, 255, 1)',
          'rgba(245, 245, 245, 1)'],
      }
    },
    indicator:[],
    triggerEvent: true,
  },
  $series: {
    label: {
      normal: {
        show: true,
        position: 'outside',
        textStyle: {
        }
      },
    },
    name: '雷达图',
    type: 'radar',
    itemStyle: {
      normal: {
        lineStyle: {
          width: 4
        },
        areaStyle: {
          type: 'default'
        }
      },
    },
    data: []
  }
};

class RadarChartController {
  constructor($rootScope, $scope, $state, SplService, config) {
    this.services = { $rootScope, $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (this.data && this.data.valueKeys.length) {
            changeRadarOption(ecChangedOption);
            this.ecOption = ecChangedOption;
            //触发图表刷新
            this.services.$scope.$broadcast('echarts:refreshOption', this.ecOption);
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
          dealRadarOption(this.ecOption, data);
          if (this.ecOption.$series.label.normal.position === 'inside') {
            this.ecOption.$series.label.normal.textStyle.color = '#00C2B1';
          }
          //触发图表刷新
          $scope.$broadcast('echarts:refreshOption', this.ecOption);
        }
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    if (event.componentType === 'radar') {
      let condition = drillCommon(this.data, event.name);
      SplService.explainDrill(this.spl, condition.name, condition.value).then(({data}) => {
        $state.go('search', { appId: this.app.appId, spl: data.query });
      });
    } else {
      return;
    }
  }

  reminder() {
    if (this.data.valueKeys.length <= 0) return 'noData';
    if (!this.data.keys.length || this.data.keys.length > 1) return 'noMatch';
  }
}

RadarChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('radarChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: RadarChartController,
});
