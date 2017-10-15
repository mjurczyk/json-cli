import path from 'path';
import { expect } from 'chai';
import { defaultConfig, userConfigFile, getDefaultConfig, getUserConfig, setUserConfig } from '@src/config';

describe('config.js', () => {
  describe('userConfigFile', () => {
    it('should be a string', () => {
      expect(userConfigFile).to.be.a('string');
    });
  });

  describe('getDefaultConfig', () => {
    it('should return default config', () => {
      const defaultConfig = getDefaultConfig();

      expect(typeof defaultConfig.color === 'boolean').to.be.true;
    });
  });

  describe('getUserConfig', () => {
    const jsMockConfigPath = path.resolve(`${__dirname}/../helpers/mock/config.file.mock.js`);
    const jsonMockConfigPath = path.resolve(`${__dirname}/../helpers/mock/config.file.mock.json`);

    it('should return some user config', () => {
      const userConfig = getUserConfig();

      expect(typeof userConfig.color === 'boolean').to.be.true;
    });

    it('should return proper config values', () => {
      const userConfig = getUserConfig(jsonMockConfigPath);

      expect(userConfig.color).to.equal(true);
    });

    it('should return default config, when called with invalid path', () => {
      const invalidConfig = getUserConfig('./not.a.config.file');
      const invalidJsonConfig = getUserConfig(jsMockConfigPath);

      expect(invalidConfig).to.deep.equal(defaultConfig);
      expect(invalidJsonConfig).to.deep.equal(defaultConfig);
    });
  });

  describe('setUserConfig', () => {
    it('should return a combined config object', () => {
      const configWithoutColor = setUserConfig({ alwaysColor: false }, {});
      const configWithColor = setUserConfig({ alwaysColor: true }, {});
      const configWithoutParams = setUserConfig(undefined, {});
      const configWithoutAny = setUserConfig(undefined, undefined);

      expect(configWithoutColor).to.deep.equal({ color: false });
      expect(configWithColor).to.deep.equal({ color: true });
      expect(configWithoutParams).to.deep.equal(defaultConfig);
      expect(configWithoutAny).to.deep.equal(defaultConfig);
    });
  });
});
