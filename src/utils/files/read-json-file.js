import R from 'ramda';
import { normalize } from 'path';
import jetpack from 'fs-jetpack';
import { warn } from '@utils/console';

export const readJsonFile = (filepath) => {
  const normalizedPath = filepath && normalize(filepath);
  const isNil = R.isNil(normalizedPath);
  const isString = typeof normalizedPath === 'string';
  const isUnreadable = isString && jetpack.exists(normalizedPath) !== 'file';

  if (!isString || isNil || isUnreadable) {
    return null;
  } else {
    try {
      const fileContents = jetpack.read(normalizedPath, 'json');

      return fileContents;
    } catch (error) {
      warn(`File ${normalizedPath} cannot be read or not a valid JSON file.`);

      return null;
    }
  }
};
