import _ from 'lodash';

const genDiffJSON = (object1, object2) => {
  let str = '{\n';
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  for (const key of keys) {
    const val1 = object1[key];
    const val2 = object2[key];
    if (!_.isUndefined(val1) && _.isUndefined(val2)) {
      str += `  - ${key}: ${val1}\n`;
    } else if (_.isUndefined(val1) && !_.isUndefined(val2)) {
      str += `  + ${key}: ${val2}\n`;
    } else if (val1 !== val2) {
      str += `  - ${key}: ${val1}\n`;
      str += `  - ${key}: ${val2}\n`;
    } else {
      str += `    ${key}: ${val1}\n`;
    }
  }
  str += '}';
  return str;
};

export default genDiffJSON;
