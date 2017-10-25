export const addNewLine = () => process.stdout.write('\n');

export const addComma = () => process.stdout.write(',');

export const print = (message = '') => {
  process.stdout.write(`${message}`);

  const chainable = {
    thenAddNewLine: () => addNewLine() && chainable,
    thenAddCommaIf: (condition) => !(condition && addComma()) && chainable
  };

  return chainable;
};
