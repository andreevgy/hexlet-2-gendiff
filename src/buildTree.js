import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return keys.map((key) => {
    if (!_.has(object2, key)) {
      return { type: 'deleted', key, val: object1[key] };
    }
    if (!_.has(object1, key)) {
      return { type: 'added', key, val: object2[key] };
    }
    const val1 = object1[key];
    const val2 = object2[key];
    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { type: 'nested', key, children: compareObjects(val1, val2) };
    }
    if (!_.isEqual(val1, val2)) {
      return {
        type: 'different', key, val1, val2,
      };
    }
    return { type: 'same', key, val: val1 };
  });
};

const buildTree = (object1, object2) => ({ type: 'root', children: compareObjects(object1, object2) });

export default buildTree;
