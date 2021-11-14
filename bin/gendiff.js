#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getComparedString from '../src/gendiff';

const cliAction = (filepath1, filepath2) => {
  const file1Extension = _.last(filepath1.split('.'));
  const file2extension = _.last(filepath2.split('.'));
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
  if (file1Extension === file2extension && file1Extension === 'json') {
    const result = getComparedString(JSON.parse(file1), JSON.parse(file2));
    console.log(result);
  }
};

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action(cliAction);

program.parse();
