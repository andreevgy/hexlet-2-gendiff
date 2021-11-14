import stylish from './stylish.js';
import plain from './plain.js';

export default (node, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(node, 0);
    case 'plain':
      return plain(node);
    default:
      return '';
  }
};
