import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth, styleField) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, val]) => styleField({ type: 'same', key, val }, depth + 1));

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const styleField = (field, depth = 0) => {
  switch (field.type) {
    case 'root': {
      const output = field.children.flatMap((node) => styleField(node, depth + 1));
      return `{\n${output.join('\n')}\n}`;
    }
    case 'nested': {
      const output = field.children.flatMap((node) => styleField(node, depth + 1));
      return `${indent(depth)}  ${field.key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
    }
    case 'added':
      return `${indent(depth)}+ ${field.key}: ${stringify(field.val, depth, styleField)}`;
    case 'deleted':
      return `${indent(depth)}- ${field.key}: ${stringify(field.val, depth, styleField)}`;
    case 'same':
      return `${indent(depth)}  ${field.key}: ${stringify(field.val, depth, styleField)}`;
    case 'different': {
      const { key, val1, val2 } = field;
      const data1 = `${indent(depth)}- ${key}: ${stringify(val1, depth, styleField)}`;
      const data2 = `${indent(depth)}+ ${key}: ${stringify(val2, depth, styleField)}`;
      return `${data1}\n${data2}`;
    }
    default:
      return '';
  }
};

export default styleField;
