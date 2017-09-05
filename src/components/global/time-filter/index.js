import app from 'App';
import './index.scss';
import moment from 'moment';
import { TimeUnits } from 'Constant';
import { parseDuration, parseTime } from 'Helpers';

class TimeFilterController {
  constructor($rootScope, $interval, $state, config) {
    this.services = { $rootScope, $interval, $state, config };
  }

  $onInit() {
    const { $state, config } = this.services;

    this.availableUnits = Object.keys(TimeUnits);

    this.relativeTimes = [
      '15m',
      '30m',
      '1h',
      '4h',
      '12h',
      '24h',
      '7d',
      '30d',
      '3M',
      '6M',
      '1y',
      '2y',
      '5y',
      '0d/d',
      '0w/w',
      '0M/M',
      '0y/y',
    ];
    this.realTimes = [
      '5s',
      '10s',
      '30s',
      '45s',
      '1m',
      '5m',
      '15m',
      '30m',
      '1h',
      '2h',
      '12h',
      '1d',
    ];

    this.ngModel.$render = () => {
      if (!this.ngModel.$viewValue) return;
      if (!Array.isArray(this.ngModel.$viewValue) || this.ngModel.$viewValue.length !== 2) {
        throw new TypeError('玩法是：[ 开始时间, 结束时间 ]');
      }

      const [ start, end ] = this.ngModel.$viewValue.map(parseTime);

      if (start.type === 'relative' && end.type === 'relative') {
        if (-start.moment > -end.moment) {
          throw new TypeError('开始时间在结束时间之后');
        }
        if (end.number) {
          throw new TypeError('不支持的结束时间（目前只支持结束时间为当前时间）');
        }
        this.display = {
          type: this.relativeTimes.includes(start.value) ? 'fast' : 'relative',
          value: start.value,
          number: start.number,
          unit: start.unit,
          moment: moment.duration(start.number, start.unit),
        };
        $state.go($state.current, {
          start: 'now' + (start.value !== '0d' ? `-${start.value}` : ''),
          end: 'now' + (end.value !== '0d' ? `-${end.value}` : ''),
        });
      } else if (start.type === 'absolute' && end.type === 'absolute') {
        if (start.value >= end.value) {
          throw new TypeError('开始时间在结束时间之后');
        }
        this.display = {
          type: 'absolute',
          start: start.value,
          end: end.value,
        };
        $state.go($state.current, {
          start: start.value,
          end: end.value,
        });
      } else {
        throw new TypeError('不支持的时间段类型');
      }
    };

    this.ngModel.$setViewValue([
      $state.params.start || config.get('timefilter:start'),
      $state.params.end || config.get('timefilter:end'),
    ], 'init');

    this.ngModel.$render();
  }

  $onDestroy() {
    const { $interval } = this.services;
    $interval.cancel(this.refreshPromise);
  }

  setRefresh(t) {
    const { $interval } = this.services;

    $interval.cancel(this.refreshPromise);

    if (t) {
      this.refreshDuration = t;
      const duration = +parseDuration(t);
      this.refreshPromise = $interval($event => {
        this.onRefresh({ $event });
      }, duration);
    } else {
      this.refreshDuration = null;
    }
  }

  setRelative(t) {
    this.ngModel.$setViewValue(['now-' + t, 'now']);
    this.ngModel.$render();
  }

  initRelative() {
    this.now = new Date();
    switch (this.display.type) {
      case 'fast':
      case 'relative':
        this.defaultValue = this.display.number;
        break;

      case 'absolute': {
        const duration = moment.duration(this.display.end - this.display.start);
        const unit = ['y', 'M', 'd', 'h', 'm', 's', 'ms'].find(unit => duration.get(unit));
        this.defaultValue = duration.get(unit);
        this.setRelative(this.defaultValue + unit);
        break;
      }
    }
    this.relativeValue = this.defaultValue;
  }

  selectNow() {
    this.absoluteValue.to = new Date();
    this.setAbsolute();
  }

  setAbsolute() {
    this.ngModel.$setViewValue([+this.absoluteValue.from, +this.absoluteValue.to]);
    this.ngModel.$render();
  }

  initAbsolute() {
    this.now = new Date();
    switch (this.display.type) {
      case 'fast':
      case 'relative':
        this.absoluteValue = {
          from: new Date(this.now - this.display.moment),
          to: new Date(this.now)
        };
        this.setAbsolute();
        break;

      case 'absolute':
        this.absoluteValue = {
          from: new Date(this.display.start),
          to: new Date(this.display.end),
        };
        break;
    }
  }
}

TimeFilterController.$inject = ['$rootScope', '$interval', '$state', 'config'];

app.component('timeFilter', {
  require: {
    ngModel: '^ngModel'
  },
  controller: TimeFilterController,
  template: require('./index.html'),
  bindings: {
    onRefresh: '&',
    // refreshDuration: '=?',
  },
  transclude: true,
});
