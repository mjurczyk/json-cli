import { expect } from 'chai';
import { isCli } from '@src/utils/is-cli';

describe('utils/is-cli.js', () => {
  describe('isCli', () => {
    it('should return true when called within a command-line context', () => {
      const mochaModule = require.main;

      expect(isCli(mochaModule)).to.be.true;
    });

    it('should return false when called within a non-command-line context', () => {
      const currentTestModule = module;

      expect(isCli(currentTestModule)).to.be.false;
    });
  });
});
