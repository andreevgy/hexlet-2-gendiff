import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (node, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(node, 0);
    case 'plain':
      return plain(node);
    case 'json':
      return json(node);
    default:
      throw new Error(`Type ${formatType} is unsupported`);
  }
};
