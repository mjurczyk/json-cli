var appendLeadingZero = (counter = INITIAL_COUNTER) => `0${counter}`.substr(-2);

var getIndentString = (depth) => {
  return (1 << Math.max(0, depth)).toString(BINARY_STRING)
    .substr(1)
    .replace(/./gm, INDENT_CHAR);
};