import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return String(data);
};

const styleField = (field, parentFieldsKeys = []) => {
  const fieldKeys = _.compact([...parentFieldsKeys, field.key]);
  const fieldName = fieldKeys.join('.');
  switch (field.type) {
    case 'root': {
      const output = _.compact(field.children.flatMap((node) => styleField(node, fieldKeys)));
      return output.join('\n');
    }
    case 'nested': {
      const output = _.compact(field.children.flatMap((node) => styleField(node, fieldKeys)));
      return output.join('\n');
    }
    case 'added':
      return `Property '${fieldName}' was added with value: ${stringify(field.val)}`;
    case 'deleted':
      return `Property '${fieldName}' was removed`;
    case 'different': {
      const { val1, val2 } = field;
      return `Property '${fieldName}' was updated. From ${stringify(val1)} to ${stringify(val2)}`;
    }
    default:
      return null;
  }
};

export default styleField;
