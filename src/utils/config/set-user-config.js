import { writeJsonFile } from '@utils/files';
import { userConfigFile, defaultConfig } from '@utils/config';

export const setUserConfig = (params = {}, userConfig = {}) => {
  const paramsConfig = {
    color: params.alwaysColor || userConfig.color || defaultConfig.color
  };
  const newConfig = {
    ...defaultConfig,
    ...userConfig,
    ...paramsConfig
  };

  writeJsonFile(userConfigFile, newConfig);

  return newConfig;
};
