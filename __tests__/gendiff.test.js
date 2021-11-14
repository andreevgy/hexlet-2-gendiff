import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiffJSON from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff works correctly for json files', () => {
  const file1 = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'file1.json'), 'utf8');
  const file2 = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'file2.json'), 'utf8');
  const expected = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', 'expect_output.txt'), 'utf8');
  const result = genDiffJSON(JSON.parse(file1), JSON.parse(file2));
  expect(result).toEqual(expected);
});
