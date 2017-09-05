import app from 'App';
import _ from 'lodash';
import './index.scss';
import dealOption from '../services/deal-option/deal-multipleYAxes-option';
import changeOption from '../services/change-option/change-multipleyaxis-option';
import drillCommon from '../services/drill/drill-common';

//默认的图表option
const defaultOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true }
    },
    right: 20,
  },
  $legend: {
    data: [],
  },
  $categoryAxis: {
    type: 'category',
    nameTextStyle: {
      fontFamily: 'Dosis',
    },
    axisTick: {
      alignWithLabel: true,
    },
    axisPointer: {
      type: 'shadow',
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
  },
  $valueAxis: {
    offset: 0,
    nameTextStyle: {
      fontFamily: 'Dosis'
    },
    axisLine: {
      lineStyle: {
        color: '',
      }
    },
    axisLabel: {
      textStyle: {
        fontFamily: 'Dosis'
      }
    },
  },
  series: [],
};

class MultipleYAxesChartController {
  constructor($rootScope, $scope, $state, SplService, config) {
    this.services = { $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'option': {
          const ecChangedOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangedOption, this.ecOption);
          if (this.data && this.data.aggs.length) {
            changeOption(ecChangedOption, this.data);
            this.ecOption = ecChangedOption;
            //触发图标刷新
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
      if (!this.remindfulType) {
        this.ecOption = this.option ? _.cloneDeep(this.option) : {};
        _.defaultsDeep(this.ecOption, defaultOption);
        if (data && data.valueKeys.length) {
          dealOption(this.ecOption, data);
          //触发图标刷新
          $scope.$broadcast('echarts:refreshOption', this.ecOption);
        }
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
    if (this.data.valueKeys.length <= 0) return 'noMatch';
    if (this.data.keys.length > 1) return 'noMatch';
    if (this.data.valueKeys.length > 4) return 'noMatch';
  }
}

MultipleYAxesChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('multipleyaxesChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: MultipleYAxesChartController,
});
