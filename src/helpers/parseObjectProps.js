import angular from 'angular';

/**
 * 将对象中的 JSON 字符串属性值反序列化回对象
 * @param {object} obj 原始对象
 * @param {string[]} props 需要转化的属性名列表
 */
export default function parseObjectProps(obj, props) {
  const result = Object.assign({}, obj);
  if (Array.isArray(props)) {
    props.forEach(key => {
      try {
        result[key] = angular.fromJson(obj[key]);
      } catch (e) {
        console.warn('解析 JSON 字符串失败！');
        result[key] = undefined;
      }
    });
  } else {
    throw new TypeError('props 必须为数组类型');
  }

  return result;
}
