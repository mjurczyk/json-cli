import R from 'ramda';

export const getCliInput = async () => {
  const isPiped = !process.stdin.isTTY;

  if (isPiped) {
    return new Promise((resolve, reject) => {
      let processInput = '';

      process.stdin.setEncoding('utf8');

      process.stdin.on('readable', () => {
        const chunk = process.stdin.read();

        if (chunk !== null) {
          processInput = R.concat(processInput, chunk);
        } else {
          resolve(processInput);
        }
      });

      process.stdin.on('error', reject);
    });
  }
};
