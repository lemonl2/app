import angular from 'angular';

/**
 * 将传入参数中的对象属性值序列化为 JSON 字符串便于保存数据库
 * @param {object} obj 原始对象
 * @param {string[]} props 需要转化的属性名列表。如不传，则转换所有对象类型的属性值
 */
export default function stringifyObjectProps(obj, props = undefined) {
  const result = Object.assign({}, obj);
  if (Array.isArray(props)) {
    props.forEach(key => result[key] = angular.toJson(obj[key]));
  } else {
    Object.entries(result).forEach(([ key, value ]) => {
      if (typeof value === 'object') {
        result[key] = angular.toJson(value);
      }
    });
  }

  return result;
}
