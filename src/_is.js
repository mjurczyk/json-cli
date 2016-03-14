var [ isCLI, isDefined, isArray, isObject, isLastProperty, isEmptyArray, isEmptyObject ] = [
  () => require.main === module,
  (value) => typeof value !== 'undefined',
  (value) => value instanceof Array,
  (value) => typeof value === 'object' && !isArray(value),
  (index, container) => index < container.length - 1,
  (array) => isArray(array) && array.length === 0,
  (object) => isObject(object) && Object.keys(object).length === 0
];
