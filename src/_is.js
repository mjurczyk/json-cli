var [ isCLI, isDefined, isArray, isObject, isLastProperty, isEmptyArray ] = [
  () => require.main === module,
  (value) => typeof value !== 'undefined',
  (value) => value instanceof Array,
  (value) => typeof value === 'object',
  (index, container) => index < container.length - 1,
  (array) => array.length === 0
];
