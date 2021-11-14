import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff works correctly for json files with stylish output', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('stylish_output.txt'), 'utf8');
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('gendiff works correctly for yaml files with stylish output', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('stylish_output.txt'), 'utf8');
  const result = genDiff(file1, file2);
  expect(result).toEqual(expected);
});

test('gendiff works correctly for json files with plain output', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('plain_output.txt'), 'utf8');
  const result = genDiff(file1, file2, 'plain');
  expect(result).toEqual(expected);
});

test('gendiff works correctly for yaml files with plain output', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('plain_output.txt'), 'utf8');
  const result = genDiff(file1, file2, 'plain');
  expect(result).toEqual(expected);
});

test('gendiff works correctly for json files with json output', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('json_output.txt'), 'utf8');
  const result = genDiff(file1, file2, 'json');
  expect(result).toEqual(expected);
});

test('gendiff works correctly for yaml files with json output', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const expected = fs.readFileSync(getFixturePath('json_output.txt'), 'utf8');
  const result = genDiff(file1, file2, 'json');
  expect(result).toEqual(expected);
});
