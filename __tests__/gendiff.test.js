import fs from 'fs';
import path from 'path';
import genDiffJSON from '../src/gendiff';

test('gendiff works correctly for json files', () => {
  const file1 = fs.readFileSync(path.resolve('./__fixtures__/file1.json'), 'utf8');
  const file2 = fs.readFileSync(path.resolve('./__fixtures__/file2.json'), 'utf8');
  const expected = fs.readFileSync(path.resolve('./__fixtures__/expect_output.txt'), 'utf8');
  const result = genDiffJSON(JSON.parse(file1), JSON.parse(file2));
  expect(result).toEqual(expected);
});
