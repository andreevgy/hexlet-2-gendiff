import genDiff from './gendiff.js';

export default (filepath1, filepath2, options) => {
  console.log(genDiff(filepath1, filepath2, options.format));
};
