import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';

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
      return {
        type: 'different', key, val1, val2,
      };
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

const yamlExtensions = ['yaml', 'yml'];

const genDiff = (path1, path2) => {
  const file1Extension = _.last(path1.split('.'));
  const file2Extension = _.last(path2.split('.'));
  const file1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(path2), 'utf8');
  if (file1Extension === file2Extension && file1Extension === 'json') {
    return getComparedString(JSON.parse(file1), JSON.parse(file2));
  }
  if (yamlExtensions.includes(file1Extension) && yamlExtensions.includes(file2Extension)) {
    return getComparedString(jsYaml.load(file1), jsYaml.load(file2));
  }
  return null;
};

export default genDiff;
