#!/usr/bin/env node
import { program } from "commander";

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')

program.parse();

const options = program.opts()
if (options.help) {
  program.outputHelp();
}
