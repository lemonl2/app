import app from 'App';
import _ from 'lodash';
import './index.scss';

class DashboardGridController {
  constructor() {
    this.gridsterOptions = {
      margins: [10, 10],
      columns: 12,
      swapping: true,
      outerMargin: false,
      draggable: {
        enabled: true,
        handle: '.box-header > h3'
      },
      resizable: {
        enabled: true,
        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
      }
    };
  }

  removeWidget(widget) {
    _.pull(this.detail, widget);
    this.onWidgetRemove({ $widget: widget });
  }
}

DashboardGridController.$inject = [];

app.component('dashboardGrid', {
  template: require('./index.html'),
  bindings: {
    detail: '<',
    timefilter: '<',
    allInputs: '<',
    onWidgetRemove: '&',
    editing: '<',
  },
  controller: DashboardGridController,
});
