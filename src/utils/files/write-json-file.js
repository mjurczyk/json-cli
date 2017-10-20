import R from 'ramda';
import { normalize } from 'path';
import jetpack from 'fs-jetpack';
import { warn } from '@utils/console';

export const writeJsonFile = (filepath, data = {}) => {
  const isString = typeof filepath === 'string';
  const normalizedPath = isString && filepath && normalize(filepath);
  const isNil = R.isNil(normalizedPath);

  if (!isString || isNil) {
    return null;
  } else {
    try {
      jetpack.write(normalizedPath, data);
    } catch (error) {
      warn(`File ${normalizedPath} cannot be written.`);
      warn(error);

      return null;
    }
  }
};
