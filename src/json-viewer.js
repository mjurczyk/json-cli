import { readJsonFile } from '@utils/files';
import { getDeepJsonBranch, getJsonFromString } from '@utils/json';

export const jsonViewer = (processInput, params = {}) => {
  const unnamedParams = [].concat(params._).filter(Boolean);

  let json;
  let targetFilePath;
  let targetJsonBranch;

  if (processInput) {
    targetJsonBranch = unnamedParams[0];

    json = getJsonFromString(processInput);
  } else {
    targetFilePath = unnamedParams[0];
    targetJsonBranch = unnamedParams[1];

    json = readJsonFile(targetFilePath);
  }

  return getDeepJsonBranch(json, targetJsonBranch);
};
