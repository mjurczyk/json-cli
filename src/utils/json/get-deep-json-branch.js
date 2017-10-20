import R from 'ramda';
import { deepJsonRegex } from '@utils/json';

export const getDeepJsonBranch = (json = {}, branch = '') => {
  const branchAsArray = R.filter(Boolean)(branch.split(deepJsonRegex));

  return R.path(branchAsArray)(json);
};
