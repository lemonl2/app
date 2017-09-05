import app from 'App';
import {EchartsThemes} from 'Constant';
import './index.scss';

class PieConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

PieConfigController.$inject = [];

app.component('pieConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: PieConfigController,
});
