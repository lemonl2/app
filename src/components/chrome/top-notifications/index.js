import app from 'App';
import './index.scss';
import './service.js';

class TopNotificationsController {
  constructor(Notifier) {
    Notifier.__component = this;
    this.alerts = [];
  }

  addAlert(alert) {
    this.alerts.push(alert);
  }

  closeAlert(index) {
    const alert = this.alerts.splice(index, 1)[0];
    if (alert && alert.callback) alert.callback();
  }
}

TopNotificationsController.$inject = ['Notifier'];

app.component('topNotifications', {
  template: require('./index.html'),
  controller: TopNotificationsController
});
