import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const variants = [
  {
    path1: 'file1.json', path2: 'file2.json', outputPath: 'stylish_output.txt', format: 'stylish', type: 'json',
  },
  {
    path1: 'file1.yaml', path2: 'file2.yml', outputPath: 'stylish_output.txt', format: 'stylish', type: 'yaml',
  },
  {
    path1: 'file1.json', path2: 'file2.json', outputPath: 'plain_output.txt', format: 'plain', type: 'json',
  },
  {
    path1: 'file1.yaml', path2: 'file2.yml', outputPath: 'plain_output.txt', format: 'plain', type: 'yaml',
  },
  {
    path1: 'file1.json', path2: 'file2.json', outputPath: 'json_output.txt', format: 'json', type: 'json',
  },
  {
    path1: 'file1.yaml', path2: 'file2.yml', outputPath: 'json_output.txt', format: 'json', type: 'yaml',
  },
];

test.each(variants)('gendiff works correctly for $type files with $format output',
  ({
    path1, path2, outputPath, format,
  }) => {
    const file1 = getFixturePath(path1);
    const file2 = getFixturePath(path2);
    const expected = fs.readFileSync(getFixturePath(outputPath), 'utf8');
    const result = genDiff(file1, file2, format);
    expect(result).toEqual(expected);
  });
