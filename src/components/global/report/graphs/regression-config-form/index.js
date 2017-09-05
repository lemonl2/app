import app from 'App';
import {EchartsThemes} from 'Constant';
import './index.scss';

class RegressionConfigController {
  constructor() {
    this.themes = EchartsThemes;
  }
}

RegressionConfigController.$inject = [];

app.component('regressionConfigForm', {
  template: require('./index.html'),
  bindings: {
    chart: '<',
    optionChange: '&',
  },
  controller: RegressionConfigController,
});
