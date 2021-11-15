import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import jsYaml from 'js-yaml';
import buildTree from './buildTree.js';
import formatTree from './formatters/index.js';

const formatters = {
  json: JSON.parse,
  yaml: jsYaml.load,
  yml: jsYaml.load,
};

const loadData = (filePath) => {
  const fileExtension = _.last(filePath.split('.'));
  const fileData = fs.readFileSync(path.resolve(filePath), 'utf8');
  return formatters[fileExtension](fileData);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const tree = buildTree(loadData(path1), loadData(path2));
  return formatTree(tree, format);
};

export default genDiff;
