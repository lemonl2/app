import moment from 'moment';

/**
 * 转换时间段字符串至数字（经过的毫秒数）
 * @param {string|number} duration 时间段字符串
 */
export default function parseDuration(duration) {
  if (typeof duration === 'string') {
    const [ , value, unit ] = /^(\d+)([smhdwMy])$/.exec(duration);
    return moment.duration(+value, unit);
  } else {
    return +duration;
  }
}
