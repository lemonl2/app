import app from 'App';
import _ from 'lodash';
import { convertTimeBounds } from 'Helpers';
import moment from 'moment';
import dealOption from '../services/deal-option/deal-calendar-option';
import changeOption from '../services/change-option/change-calendar-option';
import './index.scss';

//默认的图表option
const defaultOption = {
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross'
    },
    position: 'top',
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true }
    },
    right: 20,
  },
  $calendar: {
    dayLabel: {
      margin: 10,
    },
    yearLabel: {
      margin: 30,
      textStyle: {
        color: '#333'
      }
    }
  },
  series: [],
  calendar: [],
};

class CalendarController {
  constructor($rootScope, $scope, $state, SplService, config) {
    this.services = { $scope, $state, SplService, config };
    this.app = $rootScope.appInfo;
  }

  $onInit() {
    this.services.$scope.$on('chart:refresh', (event, type) => {
      switch (type) {
        case 'data':
          this.fetchData();
          break;
        case 'option': {
          const ecChangeOption = this.option ? _.cloneDeep(this.option) : {};
          _.defaultsDeep(ecChangeOption, this.ecOption);
          if (this.data && this.data.aggs.length) {
            changeOption(ecChangeOption, convertTimeBounds(this.timefilter).min, convertTimeBounds(this.timefilter).max);
            this.ecOption = ecChangeOption;
            this.services.$scope.$broadcast('echarts: refreshOption', this.ecOption);
          }
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
      if (moment(convertTimeBounds(this.timefilter).max).year() - moment(convertTimeBounds(this.timefilter).min).year() > 5) {
        throw new TypeError('目前只支持到最近５年的数据展示，请选择其他类型图表');
      }
      return this.data = data.aggs;
    }).then(data => {
      this.remindfulType = this.reminder();
      if (!this.remindfulType) {
        this.ecOption = this.option ? _.cloneDeep(this.option) : {};
        _.defaultsDeep(this.ecOption, defaultOption);
        if (data && data.valueKeys.length) {
          dealOption(this.ecOption, data, convertTimeBounds(this.timefilter).min, convertTimeBounds(this.timefilter).max);
        //触发图标刷新
          $scope.$broadcast('echarts: refreshOption', this.ecOption);
        }
      }
    });
  }

  drill(event) {
    const { SplService, $state } = this.services;
    const value = +new Date(`${event.data[0]}T00:00:00+08:00`);
    SplService.explainDrill(this.spl, this.data.keys[0], value).then(({data}) => {
      $state.go('search', { appId: this.app.appId, spl: data.query });
    });
  }

  reminder() {
    if (this.data.valueKeys.length <= 0) return 'noMatch';
    if (this.data.keys.length > 1) return 'noMatch';
    if (this.data.valueKeys.length > 1) return 'noMatch';
  }
}

CalendarController.$inject = ['$rootScope', '$scope', '$state', 'SplService', 'config'];

app.component('calendarChart', {
  template: require('./index.html'),
  bindings: {
    spl: '<',
    theme: '<',
    option: '<',
    timefilter: '<',
    conditions: '<',
  },
  controller: CalendarController,
});
