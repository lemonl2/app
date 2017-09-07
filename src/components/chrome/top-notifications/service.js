import app from 'App';

app.factory('Notifier', ['$q', 'config', function ($q, config) {
  const defaultTimeout = config.get('notifier:timeout');

  return class Notifier {
    add(alert) {
      const component = Notifier.__component;
      if (!component) return false;
      component.addAlert(alert);
      return true;
    }

    success(msg, timeout = defaultTimeout) {
      console.info(msg);
      return $q(cb => {
        this.add({
          type: 'success',
          title: '成功',
          content: msg,
          icon: 'check-circle',
          lifetime: timeout,
          callback: cb
        });
      });
    }

    info(msg, timeout = defaultTimeout) {
      console.log(msg);
      return $q(cb => {
        this.add({
          type: 'info',
          title: '信息',
          content: msg,
          icon: 'info-circle',
          lifetime: timeout,
          callback: cb
        });
      });
    }

    warning(msg, timeout = defaultTimeout) {
      console.warn(msg);
      return $q(cb => {
        this.add({
          type: 'warning',
          title: '警告',
          content: msg,
          icon: 'warning',
          lifetime: timeout,
          callback: cb
        });
      });
    }

    error(msg, timeout = defaultTimeout) {
      console.error(msg);
      return $q(cb => {
        this.add({
          type: 'danger',
          title: '错误',
          content: msg,
          icon: 'warning',
          lifetime: timeout,
          callback: cb
        });
      });
    }

    fatal(msg, timeout = defaultTimeout) {
      console.error(msg);
      return $q(cb => {
        this.add({
          type: 'danger',
          title: '致命错误',
          content: msg,
          icon: 'bolt',
          lifetime: timeout,
          callback: cb
        });
      });
    }

    fuck(obj, timeout = defaultTimeout) {
      if (obj == null) {
        return this.error(new Error('不知道什么玩意挂了'), timeout);
      } else if (obj instanceof Error) {
        return this.error(obj, timeout);
      } else if (typeof obj !== 'object') {
        return this.error(new Error(obj), timeout);
      } else if (obj.data) {
        return this.error(new Error(obj.data.detail || obj.data.error || obj.data.message || JSON.stringify(obj.data)), timeout);
      } else {
        return this.error(new Error(obj.detail || obj.error || obj.message || JSON.stringify(obj)), timeout);
      }
    }
  };
}]);
