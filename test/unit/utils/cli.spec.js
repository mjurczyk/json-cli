import { execSync } from 'child_process';
import path from 'path';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getCliParams, getAutoCompletion, getMatchingPath, getMatchingFile } from '@utils/cli';

chai.use(sinonChai);

describe('utils/cli', () => {
  const mockDir = path.resolve(process.cwd(), 'test/helpers/mock');
  const mockDirWithTrailingSlash = path.resolve(process.cwd(), 'test/helpers/mock/');
  const mockDirWithIncompletePath = path.resolve(process.cwd(), 'test/helpers/mock/conf');
  const mockDirWithSemiCompletePath = path.resolve(process.cwd(), 'test/helpers/mock/config.file.mock.jso');
  const mockPath = path.resolve(process.cwd(), 'test/helpers/mock/config.file.mock.json');
  const nonJsonMockPath = path.resolve(process.cwd(), 'test/helpers/mock/config.file.mock.js');

  describe('getCliParams', () => {
    it('should return cli object schema', () => {
      const result = getCliParams();

      expect(result.alwaysColor).to.equal(false);
      expect(result.color).to.equal(false);
      expect(result.help).to.equal(false);
      expect(result.version).to.equal(false);
      expect(result._).to.be.an('array');
    });
  });

  describe('getAutoCompletion', () => {
    it('should always return an array', () => {
      expect(getAutoCompletion()).to.be.an('array');
      expect(getAutoCompletion('', [])).to.be.an('array');
      expect(getAutoCompletion(undefined, undefined)).to.be.an('array');
      expect(getAutoCompletion(null, null)).to.be.an('array');
    });

    describe('for no given arguments', () => {
      it('should return empty array', () => {
        const argv = { _: [] };
        const result = getAutoCompletion('', argv);

        expect(result).to.be.empty;
      });
    });

    describe('for no given file', () => {
      describe('should list all matching files (non-JSON as well)', () => {
        it('for a direct path without trailing slash', () => {
          const file = mockDir;
          const cli = `json ${file}`;
          const argv = { _: cli.split(' ').filter(Boolean) };
          const result = getAutoCompletion('', argv);

          expect(result).to.not.be.empty;
          expect(result.filter((file) => file.indexOf('config') !== -1).length).to.be.equal(2);
        });

        it('for a direct path with a trailing slash', () => {
          const file = mockDir;
          const cli = `json ${file}`;
          const argv = { _: cli.split(' ').filter(Boolean) };
          const result = getAutoCompletion('', argv);

          expect(result).to.not.be.empty;
          expect(result.filter((file) => file.indexOf('config') !== -1).length).to.be.equal(2);
        });

        it('for a direct path without trailing slash', () => {
          const file = mockDirWithTrailingSlash;
          const cli = `json ${file}`;
          const argv = { _: cli.split(' ').filter(Boolean) };
          const result = getAutoCompletion('', argv);

          expect(result).to.not.be.empty;
          expect(result.filter((file) => file.indexOf('config') !== -1).length).to.be.equal(2);
        });

        it('for a direct path with some incomplete path', () => {
          const file = mockDirWithIncompletePath;
          const cli = `json ${file}`;
          const argv = { _: cli.split(' ').filter(Boolean) };
          const result = getAutoCompletion('', argv);

          expect(result).to.not.be.empty;
          expect(result.filter((file) => file.indexOf('config') !== -1).length).to.be.equal(2);
        });

        it('for a semi-complete path', () => {
          const file = mockDirWithSemiCompletePath;
          const cli = `json ${file}`;
          const argv = { _: cli.split(' ').filter(Boolean) };
          const result = getAutoCompletion('', argv);

          expect(result).to.not.be.empty;
          expect(result.length).to.be.equal(1);
        });
      });
    });

    describe('for any existing file', () => {
      it('should return any array', () => {
        const file = mockPath;
        const branch = '';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.be.an('array');
      });
    });

    describe('for non-JSON file', () => {
      let sandbox;
      let output;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        output = process.stderr;

        sandbox.stub(output, 'write');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should print error and return no suggestions', () => {
        const file = nonJsonMockPath;
        const branch = 'any';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.be.empty;
        expect(output.write).to.have.been.called;
      });
    });

    describe('for a JSON file', () => {
      it('should list top-most keys when no specific path is given', () => {
        const file = mockPath;
        const branch = '';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.contain('color', 'keywords', 'dependencies');
      });

      it('should list only the initial key if there are no more options', () => {
        const file = mockPath;
        const branch = 'color';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.contain('color');
      });

      it('should return nothing if there are no more options in a nested path', () => {
        const file = mockPath;
        const branch = 'color.';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.be.empty;
      });

      it('should list all keys from object when given a path to it', () => {
        const file = mockPath;
        const branch = 'dependencies.';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv)).to.contain('dependencies.prod', 'dependencies.dev', 'dependencies.peer');
      });

      it('should list all values from array when given a path to it', () => {
        const file = mockPath;
        const branch = 'keywords.';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv).length).to.equal(4);
      });

      it('should be able to access deep branches', () => {
        const file = mockPath;
        const branch = 'dependencies.peer.prod.';
        const cli = `json ${file} ${branch}`;
        const argv = { _: cli.split(' ').filter(Boolean) };

        expect(getAutoCompletion('', argv).length).to.equal(3);
      });
    });
  });

  describe('getMatchingPath', () => {
    it('should assume empty string as a default json branch path', () => {
      expect(getMatchingPath()).to.deep.equal(getMatchingPath(''));
    });
  });

  describe('getMatchingFile', () => {
    it('should assume empty string as a default file path', () => {
      expect(getMatchingFile()).to.deep.equal(getMatchingFile(''));
    });
  });

  describe('getCliInput', () => {
    const mainScriptPath = path.resolve(process.cwd(), 'src/index');
    const scriptTimeout = 10000;

    it('should use argv-based data if nothing is piped-in', () => {
      const cliScript = execSync(`babel-node "${mainScriptPath}" "${mockPath}" color`, {
        encoding: 'utf-8'
      });

      expect(cliScript).to.be.equal('true\n');
    }).timeout(scriptTimeout);

    it('should combine piped and argv data', () => {
      const cliScript = execSync(`cd ${process.cwd()} && cat package.json | babel-node "${mainScriptPath}" name`, {
        encoding: 'utf-8'
      });

      expect(cliScript).to.contain('json-viewer');
    }).timeout(scriptTimeout);
  });
});
