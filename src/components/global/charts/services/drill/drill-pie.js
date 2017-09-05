export default function (data, key, type) {
  const keys = data.keys;
  switch (keys.length) {
    case 0:
      return {
        name: key,
        value: data.values[key],
      };
    case 1:
    case 2:
      if (type === 'sub') {
        if (data.dateKeys[0] === keys[1] + '_as_time') {
          return {
            name: keys[1],
            value: data.buckets.map(bucket => bucket.buckets.find(bucket => bucket[keys[1]] === key))[0][data.dateKeys[0]],
          };
        }
        return {
          name: keys[1],
          value: key,
        };
      }
      if (data.dateKeys.length && data.dateKeys[0] === data.keys[0] + '_as_time') {
        return {
          name: keys[0],
          value: data.buckets.find(bucket => bucket[keys[0]] === key)[data.dateKeys[0]],
        };
      } else {
        return {
          name: keys[0],
          value: key,
        };
      }
  }
}
