export default function input2cond(input) {
  switch (input.type) {
    case 'checkbox':
      return `'${input.condition.field}' in (${Object.entries(input.value).filter(([, value]) => value).map(([key]) => `'${key}'`)})`;

    default:
      return `'${input.condition.field}'='${input.condition.prefix}${input.value}${input.condition.postfix}'`;
  }
}
