import app from 'App';
import './components';

import './index.scss';

class SettingController {
  constructor() {
    this.items = [
      {title: '综合情况', name: 'setting-composite'},
      {title: '系统', name: 'setting-system'},
      {title: '数据库', name: 'setting-db'},
      {title: '中间件', name: 'setting-middleware'},
    ];
    this.activeSection = { name: "setting-composite" };
  }
}

app.component('setting', {
  template: require('./index.html'),
  controller: SettingController,
});
