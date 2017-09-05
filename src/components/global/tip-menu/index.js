import app from 'App';

import './index.scss';

class TipMenuController {
  constructor() {
    this.isShow = true;
  }
}

TipMenuController.$inject = [];

app.component('tipMenu', {
  template: require('./index.html'),
  bindings: {
    titles: '<'
  },
  controller: TipMenuController,
});
