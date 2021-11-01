#!/usr/bin/env node
import { program } from "commander";
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const genDiffJSON = (object1, object2) => {
  let str = `{\n`;
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  for (const key of keys) {
    const val1 = object1[key];
    const val2 = object2[key];
    if (!_.isUndefined(val1) && _.isUndefined(val2)) {
      str += `  - ${key}: ${val1}\n`
    } else if (_.isUndefined(val1) && !_.isUndefined(val2)) {
      str += `  + ${key}: ${val2}\n`
    } else if (val1 !== val2) {
      str += `  - ${key}: ${val1}\n`
      str += `  - ${key}: ${val2}\n`
    } else {
      str += `    ${key}: ${val1}\n`
    }
  }
  str += `}`
  return str;
}

const cliAction = (filepath1, filepath2) => {
  const file1Extension = _.last(filepath1.split('.'))
  const file2extension = _.last(filepath2.split('.'))
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
  if (file1Extension === file2extension && file1Extension === 'json') {
    const result = genDiffJSON(JSON.parse(file1), JSON.parse(file2));
    console.log(result);
  }
}

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action(cliAction)

program.parse();

export default genDiffJSON;
