import { warn } from '@utils/console';

export const getJsonFromString = (value = '') => {
  const isString = typeof value === 'string';

  if (isString) {
    try {
      const json = JSON.parse(value);

      return json;
    } catch (parseError) {
      warn('Invalid JSON string.');
    }
  } else {
    warn('Not a JSON string.');
  }

  return null;
};
