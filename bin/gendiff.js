#!/usr/bin/env node
import { program } from "commander";

program
  .name('gendiff')
  .usage('[options]')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-h, --help', 'output usage information')

program.parse();

const options = program.opts()
if (options.help) {
  program.outputHelp();
}
