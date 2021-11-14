import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import formatTree from './formatters/index.js';

const compareObjects = (object1, object2) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return keys.map((key) => {
    if (!_.has(object2, key)) {
      return { type: 'deleted', key, val: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { type: 'added', key, val: object2[key] };
    }
    const val1 = object1[key];
    const val2 = object2[key];
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { type: 'nested', key, children: compareObjects(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return {
        type: 'different', key, val1, val2,
      };
    }
    return { type: 'same', key, val: val1 };
  });
};

const buildTree = (object1, object2) => ({ type: 'root', children: compareObjects(object1, object2) });

const yamlExtensions = ['yaml', 'yml'];

const genDiff = (path1, path2, format = 'stylish') => {
  const file1Extension = _.last(path1.split('.'));
  const file2Extension = _.last(path2.split('.'));
  const file1 = fs.readFileSync(path.resolve(path1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(path2), 'utf8');
  let fields = [];
  if (file1Extension === file2Extension && file1Extension === 'json') {
    fields = buildTree(JSON.parse(file1), JSON.parse(file2));
  }
  if (yamlExtensions.includes(file1Extension) && yamlExtensions.includes(file2Extension)) {
    fields = buildTree(jsYaml.load(file1), jsYaml.load(file2));
  }
  return formatTree(fields, format);
};

export default genDiff;
