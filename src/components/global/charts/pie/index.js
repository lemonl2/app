import app from 'App';
import _ from 'lodash';
import dealPieOption from '../services/deal-option/deal-pie-option';
import changePieOption from '../services/change-option/change-pie-option';
import drillPie from '../services/drill/drill-pie';
import './index.scss';

const defaultOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a}<br/>{b}: {c}({d}%)',
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    },
    right: 20,
  },
  $legend: {
    data: [],
  },
  $series: {
    label: {
      normal: {
        show: true,
        position: 'outside',
      }
    }
  },
  series: [],
};
class PieChartController {
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
            changePieOption(ecChangedOption);
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
      format: 'tree',
    })
    .then(({ data }) => {
      return this.data = data.aggs;
    }).then(data => {
      this.remindfulType = this.reminder();
      this.ecOption = this.option ? _.cloneDeep(this.option) : {};
      _.defaultsDeep(this.ecOption, defaultOption);
      if (this.data && this.data.valueKeys.length) {
        dealPieOption(this.ecOption, this.data);
        //触发图表刷新
        $scope.$broadcast('echarts:refreshOption', this.ecOption);
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    const condition = drillPie(this.data, event.name, event.data.type);
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
PieChartController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('pieChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: PieChartController,
});
