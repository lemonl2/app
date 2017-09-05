import app from 'App';
import moment from 'moment';
import { TimeUnits } from 'Constant';

app
.filter('paginate', [function paginateFilter() {
  return (arr, conf) => {
    if (!Array.isArray(arr) || !conf || !conf.currentPage || !conf.itemsPerPage) return [];
    // FIXME: Not a pure function
    conf.totalItems = arr.length;
    const start = (conf.currentPage - 1) * conf.itemsPerPage;
    return arr.slice(start, start + conf.itemsPerPage);
  };
}])
.filter('percent', [function percentFilter() {
  return value => Math.trunc(value * 100) + '%';
}])
.filter('timeUnit', [function timeUnitFilter() {
  return unit => TimeUnits[unit];
}])
.filter('duration', [function durationFilter() {
  return value => {
    if (!value) return;
    if (typeof value === 'string') { // '5d'
      const [ , number, unit, trunc ] = /^(\d+)([smhdwMy])(?:\/(\2))?/.exec(value);
      if (trunc) {
        if (+number === 0) {
          if (trunc === 'd' || trunc === 'y') {
            return '今' + TimeUnits[trunc];
          } else {
            return '本' + TimeUnits[trunc];
          }
        } else {
          throw new TypeError('不支持的时间类型');
        }
      } else {
        return `${number} ${TimeUnits[unit]}`;
      }
    } else {
      if (value < moment.duration(1, 'm')) {
        return value.get('s') + ' 秒';
      } else {
        return value.humanize();
      }
    }
  };
}])
.filter('timefilterDuration', ['$filter', function timefilterDurationFilter($filter) {
  const durationFilter = $filter('duration');
  return value => {
    if (value.includes('/')) {
      return durationFilter(value) + '迄今';
    } else {
      return '最近 ' + durationFilter(value);
    }
  };
}])
.filter('smartDate', [function smartDateFilter() {
  return value => {
    const date = moment(value);
    if (+date === +moment(date).startOf('d')) {
      return date.format('L');
    } else {
      return date.format('L HH:mm:ss');
    }
  };
}])
.filter('startsWith', [function startsWithFilter() {
  return (array, str, ignoreCase = true) => {
    if (!str) return array;
    return array.filter(x => {
      return ignoreCase ? x.toUpperCase().startsWith(str.toUpperCase()) : x.startsWith(str);
    });
  };
}])
.filter('cycleTransform', () => {
  return value => {
    switch (value) {
      case 'daily': return '每天';
      case 'weekly': return '每周';
      case 'monthly': return '每月';
      case 'once': return '仅执行一次';
      default: return '未知';
    }
  };
})
.filter('statusTransform', () => {
  return value => {
    switch (value) {
      case 0: return '准备就绪';
      case 1: return '已禁用';
      case 2: return '已删除';
      case 3: return '成功';
      case 4: return '失败';
      case 5: return '部分成功';
      case 6: return '正在运行';
      case 7: return '完成';
      default: return '无';
    }
  };
})
.filter('storageTransform', () => {
  return value => {
    switch (value) {
      case 0: return '正常';
      case 1: return '暂停';
      case 2: return '删除';
      case 3: return '正在运行';
      case 4: return '创建失败';
      default: return '无';
    }
  };
}).filter('taskTransform', () => {
  return value => {
    switch (value) {
      case 0: return '正在运行';
      case 3: return '接受';
      case 4: return '拒绝';
      case 5: return '部分成功';
      case 7: return '成功';
      case 8: return '失败';
      default: return '无';
    }
  };
})
.filter('gyr', () => {
  return (value, arr) => {
    if (typeof value !== 'number' || value !== value) return 'none';
    if (!Array.isArray(arr)) arr = [ arr.value0, arr.value1 ];
    if (value <= arr[0]) return '#55BF3B';
    if (value <= arr[1]) return '#DDDF0D';
    return '#DF5353';
  };
})
.filter('ryg', () => {
  return (value, arr) => {
    if (typeof value !== 'number' || value !== value) return 'none';
    if (!Array.isArray(arr)) arr = [ arr.value0, arr.value1 ];
    if (value <= arr[0]) return '#DF5353';
    if (value <= arr[1]) return '#DDDF0D';
    return '#55BF3B';
  };
});
