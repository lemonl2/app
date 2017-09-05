import app from 'App';
import {EchartsThemes} from 'Constant';
import './index.scss';

class CalendarConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }

  orientChange() {
    //处理水平或垂直显示
    switch (this.chart.option.$calendar.orient) {
      case 'horizontal': {
        this.chart.option.$calendar.cellSize = ['auto', 20];
        break;
      }
      case 'vertical': {
        this.chart.option.$calendar.cellSize = [20, 'auto'];
        break;
      }
    }

    this.optionChange();
  }
}

CalendarConfigController.$inject = [];

app.component('calendarConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '=',
    optionChange: '&',
  },
  controller: CalendarConfigController,
});
