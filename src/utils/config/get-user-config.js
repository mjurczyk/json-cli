import { readJsonFile } from '@utils/files';
import { userConfigFile, defaultConfig } from '@utils/config';

export const getUserConfig = (filepath = '') => {
  const userConfig = readJsonFile(filepath || userConfigFile);

  return {
    ...defaultConfig,
    ...userConfig
  };
};
