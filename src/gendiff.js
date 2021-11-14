import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return keys.map((key) => {
    const val1 = object1[key];
    const val2 = object2[key];
    if (!_.isUndefined(val1) && _.isUndefined(val2)) {
      return { type: 'deleted', key, val: val1 };
    }
    if (_.isUndefined(val1) && !_.isUndefined(val2)) {
      return { type: 'added', key, val: val2 };
    }
    if (val1 !== val2) {
      return { type: 'different', key, val1, val2 };
    }
    return { type: 'same', key, val: val1 };
  });
};

const getComparedString = (object1, object2) => {
  const fields = compareObjects(object1, object2);
  const strings = [];
  fields.forEach((field) => {
    switch (field.type) {
      case 'deleted':
        strings.push(`  - ${field.key}: ${field.val}`);
        break;
      case 'added':
        strings.push(`  + ${field.key}: ${field.val}`);
        break;
      case 'different':
        strings.push(`  - ${field.key}: ${field.val1}`);
        strings.push(`  - ${field.key}: ${field.val2}`);
        break;
      case 'same':
        strings.push(`    ${field.key}: ${field.val}`);
        break;
      default:
        break;
    }
  });
  return `{\n${strings.join('\n')}\n}`;
};

export default getComparedString;
