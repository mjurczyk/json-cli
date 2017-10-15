import { readJsonFile } from '@utils/files';
import { getDeepJsonBranch } from '@utils/json';

export const jsonViewer = (params = {}) => {
  const [
    targetFilePath,
    targetJsonBranch
  ] = params._;

  const json = readJsonFile(targetFilePath);
  const jsonBranch = getDeepJsonBranch(json, targetJsonBranch);

  return jsonBranch;
};
