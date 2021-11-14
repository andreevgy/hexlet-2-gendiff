import stylish from './stylish';
import plain from './plain';

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
