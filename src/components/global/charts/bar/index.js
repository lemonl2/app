import app from 'App';
import _ from 'lodash';
import './index.scss';
import dealOption from '../services/deal-option/deal-common-option';
import changeOption from '../services/change-option/change-common-option';
import drillCommon from '../services/drill/drill-common';

//默认的图表option
const defaultOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
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
  $valueAxis: {
    name: '',
    nameLocation: 'end',
    nameGap: 25,
    nameTextStyle: {
      fontFamily: 'Dosis'
    },
    position: 'bottom',
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
  },
  $categoryAxis: {
    type: 'category',
    name: '',
    nameLocation: 'end',
    nameGap: 25,
    nameTextStyle: {
      fontFamily: 'Dosis'
    },
    inverse: false,
    axisTick: {
      alignWithLabel: true
    },
    axisPointer: {
      type: 'shadow'
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
    data: []
  },
  series: []
};

class BarChartController {
  constructor($rootScope, $scope, $state, $timeout, SplService, config) {
    this.services = { $scope, $state, $timeout, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option' : {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (this.data && this.data.valueKeys.length) {
            dealOption(ecChangedOption, this.data, 'bar');
            changeOption(ecChangedOption, this.data);
            this.ecOption = ecChangedOption;
            //触发图表刷新
            this.services.$timeout(() => {
              this.services.$scope.$broadcast('echarts:refreshChart', this.ecOption);
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
      format: 'tree',
    })
    .then(({ data }) => {
      return this.data = data.aggs;
    }).then(data => {
      this.remindfulType = this.reminder();
      this.ecOption = this.option ? _.cloneDeep(this.option) : {};
      _.defaultsDeep(this.ecOption, defaultOption);
      if (data && data.valueKeys.length) {
        dealOption(this.ecOption, data, 'bar');
        //触发图表刷新
        $scope.$broadcast('echarts:refreshOption', this.ecOption);
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    const condition = drillCommon(this.data, event.name);
    SplService.explainDrill(this.spl, condition.name, condition.value).then(({data}) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  reminder() {
    if (this.data.valueKeys.length <= 0) return 'noData';
    if (this.data.valueKeys.length) {
      if (this.data.keys.length > 2) return 'gt2D';
    }
  }

}
BarChartController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'SplService', 'config'];

app.component('barChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: BarChartController,
});
