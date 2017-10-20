export const newLine = () => process.stdout.write('\n');

export const print = (message = '') => {
  process.stdout.write(`${message}`);

  return {
    thenAddNewLine: newLine
  };
};
