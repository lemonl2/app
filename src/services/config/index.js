import app from 'App';

app.factory('config', [() => {
  const configObj = {
    'search:timestampField': {
      type: 'string',
      default: '@timestamp',
      description: '默认的时间戳字段名',
    },
    'search:maxcount': {
      type: 'number',
      default: 10000,
      description: 'from + size 最大的条数，主要和 ES 中搜索的配置有关',
    },
    'search:bucketsNumber': {
      type: 'number',
      default: 12,
      description: '图表默认的分桶数量',
    },
    'search:timezone': {
      type: 'string',
      default: '+08:00',
      description: '默认时间分桶使用的时区',
    },

    'chart:maxcount': {
      type: 'number',
      default: 200,
      description: '图表最大可以显示的条数',
    },
    'chart:defaultTheme': {
      type: 'string',
      default: 'infographic',
      description: '图表默认主题',
    },

    'notifier:timeout': {
      type: 'number',
      default: 5000,
      description: '提示栏默认关闭时间（ms）',
    },

    'timefilter:start': {
      type: 'string',
      default: 'now-15d',
      description: '默认时间控件开始时间',
    },
    'timefilter:end': {
      type: 'string',
      default: 'now',
      description: '默认时间控件结束时间',
    },

    'timeline:frequency': {
      type: 'string',
      default: '1h',
      description: '排障助手告警与日志分析分桶（采集）单位，越小越精细，但是数据量越大',
    },

    'performance:useKeyPoint': {
      type: 'boolean',
      default: true,
      description: '排障助手主机性能指标使用关键点计算当前值，否则使用牛顿逼近法计算（更精确，但是非常慢）',
    },
    'performance:frequency': {
      type: 'string',
      default: 'minute',
      description: '排障助手主机性能指标分桶（采集）单位，越小越精细，但是数据量越大',
    },
  };

  // if (Object.keys(INIT_CONFIGS).length) {
  //   console.group('高级配置');

  //   Object.entries(INIT_CONFIGS).forEach(([key, value]) => {
  //     const config = configObj[key];
  //     if (!config) {
  //       console.warn('发现未知配置项', key, '，已忽略');
  //       return;
  //     }
  //     try {
  //       value = JSON.parse(value);
  //     } catch (e) {
  //       console.warn('解析配置项', key, '失败，已忽略');
  //       return;
  //     }
  //     if (config.type !== typeof value) {
  //       console.warn('发现配置项', key, '类型不符，期望为', config.type, '，实际为', typeof value, '，已忽略');
  //       return;
  //     }
  //     if (config.value === value) {
  //       console.info('发现与默认值相同的自定义配置项, ', key);
  //       return;
  //     }

  //     config.value = value;
  //     console.info('已应用配置项', key);
  //   });

  //   console.groupEnd();
  // }


  return {
    get(key) {
      if (!(key in configObj)) throw new TypeError('未知配置项', key);
      const obj = configObj[key];
      return obj.value !== undefined ? obj.value : obj.default;
    },
    getAll() {
      return configObj;
    },
  };
}]);
