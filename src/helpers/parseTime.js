import moment from 'moment';

/**
 * 解析时刻字符串
 * @param {string|number|object} time 所需解析的时刻（可以为相对时间或绝对时间）
 */
export default function parseTime(time) {
  switch (typeof time) {
    case 'string': {
      const number = +time;
      if (number === number) {
        return {
          type: 'absolute',
          value: number,
          moment: moment(number),
          timestamp: number,
        };
      }

      const matches = /^now(?:-((\d+)([smhdwMy])(?:\/([dwMy]))?))?$/.exec(time);
      if (matches) {
        const number = +matches[2] || 0;
        const unit = matches[3] || 'd';
        const trunc = matches[4];
        let momentObj = moment.duration(number, unit);
        let timestamp = Date.now() - momentObj;

        if (trunc) {
          timestamp = moment(timestamp).startOf(trunc);
          momentObj = moment.duration(Date.now() - timestamp);
        }

        return {
          type: 'relative',
          value: matches[1] || '0d',
          number,
          unit,
          moment: momentObj,
          trunc,
          timestamp,
        };
      } else {
        const value = Date.parse(time);
        if (value) {
          return {
            type: 'absolute',
            value: value,
            moment: moment(value),
            timestamp: value,
          };
        }
      }

      throw new TypeError('不支持的时间类型');
    }

    case 'number':
    case 'object': {
      return {
        type: 'absolute',
        value: +time,
        timestamp: +time,
      };
    }

    default:
      throw new TypeError('不支持的时间类型');
  }
}
