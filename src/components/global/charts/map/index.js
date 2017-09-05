import app from 'App';
import _ from 'lodash';
import dealMapOption from '../services/deal-option/deal-map-option';
import changeMapOption from '../services/change-option/change-map-option';
import echarts from 'echarts';
echarts.registerMap('china', require('./china.json'));

//默认的图表option
const defaultOption = {
  visualMap: {
    min: 0,
    max: 0,
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true},
    },
    right: 20,
  },
  $legend: {
    data:[]
  },
  series: [],
};

class MapChartController {
  constructor($rootScope, $scope, $state, SplService, config) {
    this.services = { $rootScope, $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }
  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option': {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.option);
          if (this.data && this.data.valueKeys.length) {
            dealMapOption(ecChangedOption, this.data);
            changeMapOption(ecChangedOption, this.data);
            this.ecOption = ecChangedOption;
            //触发图表刷新
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
    const { $scope, SplService,config } = this.services;
    SplService.query(this.spl, {
      size: config.get('chart:maxcount'),
      start: this.timefilter[0],
      end: this.timefilter[1],
      filters: this.conditions,
      format: 'tree',
    }).then(({ data }) =>{
      return this.data = data.aggs;
    }).then(data => {
      this.remindfulType = this.reminder();
      this.ecOption = this.option ? _.cloneDeep(this.option) : {};
      _.defaultsDeep(this.ecOption, defaultOption);
      if (this.data && this.data.valueKeys.length) {
        dealMapOption(this.ecOption, this.data);
        //触发图表刷新
        $scope.$broadcast('echarts:refreshOption', this.ecOption);
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    SplService.explainDrill(this.spl, this.data.keys[0], event.name).then(({data}) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  reminder() {
    if (this.data.valueKeys.length <= 0) return 'noData';
    if (this.data.valueKeys.length) {
      if (this.data.keys.length === 0) return 'noMatch';
    }
  }
}

MapChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('mapChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<'
  },
  controller: MapChartController,
});
