import path from 'path';

export const defaultConfig = {
  color: false
};

export const userConfigFile = path.resolve(__dirname, '.user-config.json');

export * from './get-default-config';
export * from './get-user-config';
export * from './set-user-config';
