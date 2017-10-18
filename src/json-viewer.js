import { readJsonFile } from '@utils/files';
import { getDeepJsonBranch, getJsonFromString } from '@utils/json';

export const jsonViewer = (processInput, params = {}) => {
  const unnamedParams = params._;

  let json;
  let targetFilePath;
  let targetJsonBranch;

  if (processInput) {
    targetJsonBranch = unnamedParams[0];

    json = getJsonFromString(processInput);
  } else if (unnamedParams.length > 0) {
    targetFilePath = unnamedParams[0];
    targetJsonBranch = unnamedParams[1];

    json = readJsonFile(targetFilePath);
  } else {
    return;
  }

  return getDeepJsonBranch(json, targetJsonBranch);
};