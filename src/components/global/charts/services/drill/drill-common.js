export default function (data, key) {
  const keys = data.keys;
  switch (keys.length) {
    case 0:
      return {
        name: key,
        value: data.values[key],
      };
    case 1:
    case 2:
      return {
        name: keys[0],
        value: data.buckets ? data.buckets.find(bucket => bucket[keys[0]] === key)[data.keys[0]] : data.aggs.find(item => item[keys[0]] === key)[data.keys[0]]
      };
  }
}
