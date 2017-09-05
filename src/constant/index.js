/**
 * 以下为全局使用的常量
 */
import defaultCommonOption from 'Src/components/global/charts/services/default-option/default-common-option';
import defaultPieOption from 'Src/components/global/charts/services/default-option/default-pie-option';
import defaultGaugeOption from 'Src/components/global/charts/services/default-option/default-gauge-option';
import defaultRegressionOption from 'Src/components/global/charts/services/default-option/default-regression-option';
import defaultRadarOption from 'Src/components/global/charts/services/default-option/default-radar-option';
import defaultMultipleYAxesOption from 'Src/components/global/charts/services/default-option/default-multipleYAxes-option';
import defaultFunnelOption from 'Src/components/global/charts/services/default-option/default-funnel-option';
import defaultCalendarOption from 'Src/components/global/charts/services/default-option/default-calendar-option';
import defaultMapOption from 'Src/components/global/charts/services/default-option/default-map-option';
import defaultBubbleOption from 'Src/components/global/charts/services/default-option/default-bubble-option';

//状态码
const MsgCode = Object.freeze({
  // 处理成功返回码
  success: '0000',
  // 有重复记录返回码,{*}记录重复
  notUnique: '0010',
  // 不存在记录的返回码,{*}记录不存在
  notExist: '0020',
  // 不允许为空的返回码
  notNull: '0030',
  // 类型不匹配的返回码或者数据输入不一致
  notMatch: '0040',
  // 超过最大长度的返回码
  overLength: '0050',
  // 超时
  timeOut: '0060',

  // 数据库插入错误情况返回码  01**
  addError: '0100',

  // 数据库删除错误情况返回码  02**
  delError:'0200',
  InUse: '0210',

  // 数据库修改错误情况返回码  03**
  updateError: '0300',
  // 数据冲突需要确认是否覆盖
  conflictNeedConfirm: '0320',

  queryError: '0400',

  unAuthorized: '5000',

  // 没有权限的操作
  forbidden: '6000',
});

//状态对应显示值
const Status = Object.freeze([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
]);

const StatusValue = Object.freeze({
  enabled: 1,
  disabled: 0,
});


//图表主题
const EchartsThemes = Object.freeze([
  { label: '怀旧', value: 'vintage' },
  { label: '深色', value: 'dark' },
  { label: '清凉', value: 'macarons' },
  { label: '信息图表', value: 'infographic' },
  { label: '阳光', value: 'shine' },
  { label: '罗马', value: 'roma' },
  { label: '暖色', value: 'warm' },
  { label: '商务', value: 'business' },
]);

const IntervalOptions = Object.freeze([
  { display: '自动', hours: 0 },
  { display: '每时', hours: 1 },
  { display: '每日', hours: 24 },
  { display: '每周', hours: 24 * 7 },
  { display: '每月', hours: 24 * 30 },
  { display: '每年', hours: 24 * 365 },
]);

const commonOption = defaultCommonOption();
const ChartType = Object.freeze([
  Object.freeze({
    title: '柱状图',
    name: 'bar',
    description: '',
    option: commonOption,
  }),
  Object.freeze({
    title: '折线图',
    name: 'line',
    description: '',
    option: commonOption,
  }),
  Object.freeze({
    title: '饼图',
    name: 'pie',
    description: '',
    option: defaultPieOption(),
  }),
  Object.freeze({
    title: '面积图',
    name: 'area',
    description: '',
    option: commonOption,
  }),
  Object.freeze({
    title: '散点图',
    name: 'scatter',
    description: '',
    option: commonOption,
  }),
  Object.freeze({
    title: '多Y轴图',
    name: 'multipleYAxes',
    description: '',
    option: defaultMultipleYAxesOption(),
  }),
  Object.freeze({
    title: '单值图',
    name: 'metric',
    description: '',
    option: {},
  }),
  Object.freeze({
    title: '仪表盘',
    name: 'gauge',
    description: '',
    option: defaultGaugeOption(),
  }),
  Object.freeze({
    title: '线性回归图',
    name: 'regression',
    description: '',
    option: defaultRegressionOption(),
  }),
  Object.freeze({
    title: '雷达图',
    name: 'radar',
    description: '',
    option: defaultRadarOption(),
  }),
  Object.freeze({
    title: '气泡图',
    name: 'bubble',
    description: '',
    option: defaultBubbleOption(),
  }),
  Object.freeze({
    title: '漏斗图',
    name: 'funnel',
    description: '',
    option: defaultFunnelOption(),
  }),
  Object.freeze({
    title: '日历热图',
    name: 'calendar',
    description: '',
    option: defaultCalendarOption(),
  }),
  Object.freeze({
    title: '地图',
    name: 'map',
    description: '',
    option: defaultMapOption(),
  }),
]);

const GlobalApp = Object.freeze({
  appId: 0,
  appAlias: '全局',
  appName: '',
});

const TimeUnits = Object.freeze({
  s: '秒',
  m: '分钟',
  h: '小时',
  d: '天',
  w: '周',
  M: '月',
  y: '年',
});

/* eslint-disable no-undef */
const Sharplook = Object.freeze({
  // environment: __SHARPLOOK_ENVIRONMENT__,
  // version: __SHARPLOOK_VERSION__,
  // compileTime: __SHARPLOOK_COMPILE_TIME__,
  // commitSha: __SHARPLOOK_COMMIT_SHA__,
});
/* eslint-enable */

const LineColors = Object.freeze([
  '#3181DE',
  '#E4301B',
  '#D94EF5',
  '#20BCDB',
  '#A66327',
  '#F5A623',
  '#4DE35E',
]);

export {
  Sharplook,
  MsgCode,
  Status,
  StatusValue,
  EchartsThemes,
  IntervalOptions,
  SystemConvert,
  ChartType,
  TimeUnits,
  LineColors,
};
