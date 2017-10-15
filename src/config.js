import path from 'path';
import { readJsonFile, writeJsonFile } from '@utils/files';

export const defaultConfig = {
  color: false
};

export const userConfigFile = path.resolve(__dirname, '.user-config.json');

export const getDefaultConfig = () => defaultConfig;

export const getUserConfig = (filepath = '') => {
  const userConfig = readJsonFile(filepath || userConfigFile);

  return {
    ...defaultConfig,
    ...userConfig
  };
};

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
